import Editor, { Monaco, loader, useMonaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import githubLight from "monaco-themes/themes/GitHub Light.json";
import { configureMonacoYaml } from "monaco-yaml";
import { useCallback, useEffect, useRef } from "react";
import YAML from "yaml";

loader.config({ monaco });

window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case "json":
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/json/json.worker",
            import.meta.url
          )
        );
      case "yaml":
        return new Worker(new URL("monaco-yaml/yaml.worker", import.meta.url));
      default:
        throw new Error(`Unknown label ${label}`);
    }
  }
};

interface Props {
  value?: string;
  readOnly?: boolean;
  onChange: (value: string | undefined, viewUpdate: unknown) => void;
  schemaFilePrefix?: "component" | "canary" | "system" | "scrape_config";
  language?: string;
  extractYamlSpecFieldOnPaste?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  schemaFilePrefix,
  language,
  extractYamlSpecFieldOnPaste = false
}: Props) {
  const editorWrapper = useRef<HTMLDivElement>(null);

  const monaco = useMonaco();

  useEffect(() => {
    if (!extractYamlSpecFieldOnPaste) {
      return;
    }
    // default paste event handler type is just Event, which is inaccurate, hence we
    // are overriding it here, so we can use ClipboardEvent, which is more
    // accurate and allows us to access clipboardData safely
    // @ts-ignore
    window.addEventListener("paste", (e: ClipboardEvent) => {
      if (editorWrapper.current?.id === document.activeElement?.id && monaco) {
        e.preventDefault();
        const text = e.clipboardData?.getData("text/plain");
        if (text) {
          if (language === "yaml") {
            const yaml = YAML.parse(text);
            if (yaml.spec) {
              const model = monaco.editor
                .getModels()
                // at the moment, we only have one model that is yaml, but
                // this may change in the future and we should find a more
                // robust way of identifying the model and can cause spec being
                // pasted in the wrong editor
                .find(
                  (m) => m.getValue() === text && m.getLanguageId() === "yaml"
                );
              model?.setValue(YAML.stringify(yaml.spec));
            }
          }
        }
      }
    });

    return () => {
      window.removeEventListener("paste", () => {});
    };
  }, [language, extractYamlSpecFieldOnPaste, monaco]);

  const setupYamlSchemas = useCallback(
    (monaco: Monaco) => {
      if (!schemaFilePrefix || language !== "yaml") {
        return;
      }

      console.log("Setting up YAML schemas");

      // Define a new theme that is based on the GitHub Light theme
      monaco.editor.defineTheme("githubLight", githubLight as any);

      // Load the schema file from the server
      const schemaFileName = `${schemaFilePrefix}.spec.schema.json`;
      configureMonacoYaml(monaco, {
        enableSchemaRequest: true,
        hover: true,
        completion: true,
        validate: true,
        format: true,
        schemas: [
          {
            // Our schema file will be loaded from the server
            uri: `/api/schemas/${schemaFileName}`,
            // Files to associate with our model, in this case everything
            fileMatch: ["*"]
          }
        ]
      });
    },
    [language, schemaFilePrefix]
  );

  return (
    <Editor
      className="border shadow py-2"
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={onChange}
      width="100%"
      beforeMount={setupYamlSchemas}
      options={{
        renderLineHighlight: "none",
        readOnly,
        minimap: { enabled: false },
        formatOnPaste: true,
        formatOnType: true,
        scrollBeyondLastLine: false
      }}
      wrapperProps={{
        ref: editorWrapper
      }}
      {...{
        // high contrast theme for yaml and json
        ...((language === "yaml" || language === "json") && {
          theme: "githubLight"
        })
      }}
    />
  );
}
