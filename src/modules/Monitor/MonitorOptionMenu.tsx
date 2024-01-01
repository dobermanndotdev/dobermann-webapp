import { apiClients } from "@@/common/libs/api";
import { paths } from "@@/common/libs/contants";
import { notifyGenericError } from "@@/common/libs/errors";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface Props {
  paused: boolean;
  monitorId: string;
  onPauseChange(): Promise<void>;
}

export default function MonitorOptionMenu({ monitorId, paused: initialPaused, onPauseChange }: Props) {
  const router = useRouter();
  const [isPausing, setIsPausing] = useState(false);
  const [paused, setPaused] = useState(initialPaused);

  const onPauseHandler = useCallback(async () => {
    setIsPausing(true);

    try {
      await apiClients().MonitorsApiFactory.toggleMonitorPause(monitorId, { pause: !paused });
      await onPauseChange();
      setPaused(!paused);
    } catch (error) {
      console.log("err", error);
      notifyGenericError();
    }

    setIsPausing(false);
  }, [paused]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          Options
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => router.push(paths.toEditMonitor(monitorId))}>Edit</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => onPauseHandler()}>{paused ? "Unpause" : "Pause"}</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
