import { apiClients } from "@@/common/libs/api";
import { Monitor } from "@@/common/libs/apiClient";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useLiveMonitor(initialData: Monitor, interval = 15 * 1000) {
  const [monitor, setMonitor] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const monitorId = useMemo(() => initialData.id, [initialData.id]);

  const startLongPolling = useCallback(() => {
    return window.setInterval(async () => {
      setIsLoading(true);
      const { data } = await apiClients().MonitorsApiFactory.getMonitorByID(monitorId);
      setMonitor(data.data);
      setIsLoading(false);
    }, interval);
  }, [interval, monitorId]);

  useEffect(() => {
    let tId = 0;

    const handler = () => {
      if (document.visibilityState === "visible") {
        startLongPolling();
      } else {
        window.clearInterval(tId);
      }
    };

    if (!monitor.is_paused) {
      tId = startLongPolling();
      document.addEventListener("visibilitychange", handler);
    } else {
      window.clearInterval(tId);
    }

    return () => {
      window.clearInterval(tId);
      document.removeEventListener("visibilitychange", handler);
    };
  }, [monitor.is_paused, startLongPolling]);

  return { monitor, isLoading, setMonitor };
}
