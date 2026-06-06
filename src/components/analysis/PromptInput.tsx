import React from 'react';

type Props = { onSubmit?: (prompt: string) => void };

export default function PromptInput({ onSubmit }: Props) {
  return (
    <div>
      <textarea placeholder="Enter prompt" />
      <button onClick={() => onSubmit?.('')}>Run</button>
    </div>
  );
}
