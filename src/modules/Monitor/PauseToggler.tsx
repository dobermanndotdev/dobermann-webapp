"use client";

import { Button } from "@@/common/components/Button";
import { apiClients } from "@@/common/libs/api";
import { notifyGenericError } from "@@/common/libs/errors";
import { useState } from "react";

interface Props {
  isPaused: boolean;
  monitorId: string;
  onSuccess(): Promise<void>;
}

export function PauseToggler({ isPaused: initialIsPaused, monitorId, onSuccess }: Props) {
  const [paused, setPaused] = useState(initialIsPaused);
  const [isLoading, setIsLoading] = useState(false);

  const handler = async () => {
    setIsLoading(true);

    try {
      await apiClients.MonitorsApiFactory.toggleMonitorPause(monitorId, { pause: !paused });
      await onSuccess();
      setPaused(!paused);
    } catch (error) {
      notifyGenericError();
    }

    setIsLoading(false);
  };

  return (
    <Button isLoading={isLoading} disabled={isLoading} onClick={handler} className="btn-sm btn-secondary">
      {paused ? "Unpause" : "Pause"}
    </Button>
  );
}
