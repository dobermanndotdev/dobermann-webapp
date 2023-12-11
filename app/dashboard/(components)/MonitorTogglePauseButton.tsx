"use client";

import { appConfig } from "@@/app/config";
import { Button } from "@@/common/components/Button";
import { Configuration, MonitorsApiFactory } from "@@/common/libs/apiClient";
import { useState } from "react";

interface Props {
  isPaused: boolean;
  monitorId: string;
}

export function MonitorTogglePauseButton({ isPaused, monitorId }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handler = async () => {
    setIsLoading(true);

    try {
      const client = MonitorsApiFactory(new Configuration({ basePath: appConfig.apiUrl, accessToken: "" }));
      await client.toggleMonitorPause(monitorId, { pause: !isPaused });
      setIsLoading;
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Button onClick={handler} className="btn-sm btn-secondary">
      {isPaused ? "Unpause" : "Pause"}
    </Button>
  );
}
