import React, { useEffect, useState } from "react";
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";

import { getPersons, User } from "../../api/services/users";
import { Icon } from "../Icon";

const mentionsStyle = {
  control: {
    fontSize: 14
  },

  "&multiLine": {
    control: {
      minHeight: 80
    },
    highlighter: {
      padding: 9,
      paddingTop: 11
    },
    input: {
      padding: 9,
      borderRadius: "0.375rem",
      borderColor: "rgb(229 231 235)"
    }
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14
    },
    item: {
      padding: 5,
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5"
      }
    }
  }
};

const Suggestion = ({
  display,
  avatar
}: SuggestionDataItem & { avatar?: string }) => (
  <div className="flex items-center">
    {avatar && <Icon name={avatar} size="xl" />}
    <p className="pl-2">{display}</p>
  </div>
);

interface Props {
  value: string;
  trigger?: string;
  markup?: string;
  onChange: (text: string) => void;
  singleLine: boolean;
}

export const MENTION_MARKUP = "@[__display__](user:__id__)";
export const MENTION_TRIGGER = "@";

export const CommentInput = ({
  value,
  onChange,
  markup = MENTION_MARKUP,
  trigger = MENTION_TRIGGER,
  singleLine
}: Props) => {
  const [users, setUsers] = useState<Array<User & SuggestionDataItem>>([]);

  /* TODO: lazy load user list, based on typing */
  useEffect(() => {
    getPersons().then(({ data = [] }) => {
      const users = data.map((user) => ({
        ...user,
        display: user.name
      }));
      setUsers(users);
    });
  }, []);

  return (
    <MentionsInput
      singleLine
      value={value}
      onChange={(e) => onChange(e.target.value)}
      a11ySuggestionsListLabel="Suggested mentions"
      style={mentionsStyle}
      allowSpaceInQuery
      allowSuggestionsAboveCursor
    >
      <Mention
        markup={markup}
        trigger={trigger}
        data={users}
        renderSuggestion={Suggestion}
        className="bg-blue-200 rounded"
      />
    </MentionsInput>
  );
};
