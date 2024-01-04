import AlertDialog from "@@/common/components/AlertDialog";
import { apiClients } from "@@/common/libs/api";
import { Monitor } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
import { notifyGenericError } from "@@/common/libs/errors";
import { styled } from "@@/common/styles/emotion";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface Props {
  monitor: Monitor;
  onPauseChange(): Promise<void>;
}

export default function MonitorOptionMenu({ monitor, onPauseChange }: Props) {
  const router = useRouter();
  const [isPausing, setIsPausing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [paused, setPaused] = useState(monitor.is_paused);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const onPauseHandler = useCallback(async () => {
    setIsPausing(true);

    try {
      await apiClients().MonitorsApiFactory.toggleMonitorPause(monitor.id, { pause: !paused });
      await onPauseChange();
      setPaused(!paused);
    } catch {
      notifyGenericError();
    }

    setIsPausing(false);
  }, [paused, monitor.id, onPauseChange]);

  const deleteMonitorHandler = useCallback(async () => {
    try {
      setIsDeleting(true);
      await apiClients().MonitorsApiFactory.deleteMonitor(monitor.id);
      setShowDeleteDialog(false);
      router.push(paths.monitors);
    } catch (error) {
      notifyGenericError();
      setIsDeleting(false);
    }
  }, [router, monitor.id]);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" color="gray">
            Options
            <CaretDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenuItem onClick={() => router.push(paths.toEditMonitor(monitor.id))}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPauseHandler()}>{paused ? "Unpause" : "Pause"}</DropdownMenuItem>
          <DropdownMenu.Separator />
          <DropdownMenuItem color="red" onClick={() => setShowDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <AlertDialog
        title="Delete monitor"
        open={showDeleteDialog}
        isConfirmInProgress={isDeleting}
        confirmHandler={deleteMonitorHandler}
        onOpenChange={(isOpen) => setShowDeleteDialog(isOpen)}
        description={`You are about to delete the monitor ${monitor.endpoint_url}. Please confirm.`}
      ></AlertDialog>
    </>
  );
}

const DropdownMenuItem = styled(DropdownMenu.Item)`
  cursor: ${(p) => (p.onClick ? "pointer" : "initial")};
`;
