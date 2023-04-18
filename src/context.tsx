import { Form, ActionPanel, Action, useNavigation } from "@raycast/api";
import { useCachedState } from "@raycast/utils";
import { useState } from "react";
import { ContextFields } from "./utils/types";

export default function Command() {
  const [_, setContextText] = useCachedState("context-text", "");
  const [rememberContext, setRememberContext] = useState(true);
  const { pop } = useNavigation();

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            onSubmit={async (values: ContextFields) => {
              console.log("onSubmit", values);
              const { context, remember } = values;
              if (context) {
                setContextText(context);
                setRememberContext(remember);
              }
              pop();
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="context"
        title="Context"
        autoFocus
        storeValue={rememberContext}
        placeholder="Put any extra code or context here."
      />
      <Form.Checkbox id="remember" label="Remember this context?" defaultValue={rememberContext} />
    </Form>
  );
}
