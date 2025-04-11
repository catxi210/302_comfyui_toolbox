import { saveAs } from "file-saver";
import { useCallback } from "react";
interface MonitorMessage {
  from: "monitor";
  eventType: "downloadFile" | "openNewWindow";
  target?: string;
  url: string;
  download?: string;
}

export const useMonitorMessage = () => {
  const sendMonitorMessage = useCallback(
    (message: Omit<MonitorMessage, "from">) => {
      console.log("sendMonitorMessage", message);
      window.parent.postMessage(
        {
          from: "monitor",
          ...message,
        },
        "*"
      );
    },
    []
  );

  const handleDownload = useCallback(
    async (url: string, filename?: string, cb?: () => void) => {
      sendMonitorMessage({
        eventType: "downloadFile",
        url,
        download: filename,
      });

      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, filename || "download");

      cb?.();
    },
    [sendMonitorMessage]
  );

  const handleNewWindow = useCallback(
    (url: string, target: string = "_blank") => {
      sendMonitorMessage({
        eventType: "openNewWindow",
        url,
        target,
      });
      window.open(url, target);
    },
    [sendMonitorMessage]
  );

  return {
    handleDownload,
    handleNewWindow,
    sendMonitorMessage,
  };
};
