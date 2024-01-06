import { Badge } from "@@/common/components/Badge";
import { Card } from "@@/common/components/Card";
import { Flex } from "@@/common/components/Flex";
import { Grid } from "@@/common/components/Grid";
import { Heading } from "@@/common/components/Heading";
import { PageTitle } from "@@/common/components/PageTitle";
import { Stat } from "@@/common/components/Stat";
import { Text } from "@@/common/components/Text";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { apiClients, ssrApiClients } from "@@/common/libs/api";
import { Monitor, ResponseTimeStat } from "@@/common/libs/apiClient";
import { Dates } from "@@/common/libs/dates";
import { notify } from "@@/common/libs/errors";
import { IncidentTable } from "@@/modules/Incident/IncidentTable";
import { LiveLastCheckedAt } from "@@/modules/Monitor/LiveLastCheckedAt";
import MonitorOptionMenu from "@@/modules/Monitor/MonitorOptionMenu";
import { ResponseTimeStatsChart } from "@@/modules/Monitor/ResponseTimeStatsChart";
import { useLiveMonitor } from "@@/modules/Monitor/hooks";
import { formatCheckIntervalToMinutes } from "@@/modules/Monitor/lib";
import { CheckIcon, Cross2Icon, PauseIcon } from "@radix-ui/react-icons";
import { GetServerSideProps } from "next";
import { useCallback } from "react";

interface Props {
  monitor: Monitor;
  responseTimeStats: ResponseTimeStat[];
}

export default function MonitorPage({ monitor: initialData, responseTimeStats }: Props) {
  const { monitor, setMonitor } = useLiveMonitor(initialData);

  const refreshMonitor = useCallback(async () => {
    try {
      const { data } = await apiClients().MonitorsApiFactory.getMonitorByID(monitor.id);
      setMonitor(data.data);
    } catch (error) {
      notify("Unable to refresh monitor. Please reload the page", { type: "error" });
    }
  }, [monitor.id, setMonitor]);

  return (
    <DashboardLayout
      title={`Monitor ${monitor.endpoint_url}`}
      breadcrumbReplacer={{ key: "[monitorId]", pathname: monitor.id, label: monitor.endpoint_url }}
    >
      <PageTitle
        title={monitor.endpoint_url}
        CallToAction={<MonitorOptionMenu onPauseChange={refreshMonitor} monitor={monitor} />}
      >
        <Flex gap="2">
          {monitor.is_paused && (
            <Badge color="orange">
              <PauseIcon />
              Paused
            </Badge>
          )}

          {!monitor.is_paused && (
            <>
              {monitor.is_endpoint_up && (
                <Badge>
                  <CheckIcon />
                  Up
                </Badge>
              )}
              {!monitor.is_endpoint_up && (
                <Badge color="red">
                  <Cross2Icon />
                  Down
                </Badge>
              )}
              <Text size="2">Checked every {formatCheckIntervalToMinutes(monitor.check_interval_in_seconds)}</Text>
            </>
          )}
        </Flex>
      </PageTitle>

      <Grid columns="3" gap="4" width="auto" mb="5">
        <Stat label="Uptime" value={monitor.up_since ? Dates.fromNow(monitor.up_since, true) : "-"} />
        <Stat label="Last checked at" value={<LiveLastCheckedAt value={monitor.last_checked_at || ""} />} />
        <Stat label="Incidents" value={monitor.incidents.length || 0} />
      </Grid>

      <Heading size="4" mb="2">
        Response time
      </Heading>
      {!!responseTimeStats.length && (
        <Card size="2" mb="5">
          <ResponseTimeStatsChart monitorId={monitor.id} responseTimeStats={responseTimeStats} className="mt-4" />
        </Card>
      )}

      <Heading size="4" mb="2">
        Incidents
      </Heading>
      <IncidentTable incidents={monitor.incidents} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, params }) => {
  const client = ssrApiClients(req);
  const monitorId = params?.monitorId as string;

  try {
    const { data } = await client.MonitorsApiFactory.getMonitorByID(monitorId);
    const { data: responseTimeStats } = await client.MonitorsApiFactory.getMonitorResponseTimeStats(monitorId, 1);

    return {
      props: {
        monitor: data.data,
        responseTimeStats: responseTimeStats.data,
      },
    };
  } catch (error) {
    return {
      props: {
        monitor: {} as any,
        responseTimeStats: [],
      },
    };
  }
};
