// "use client";

// import { useTranslations } from "next-intl";
// import { HistoryCard } from "../history-card";
// import { ActionGroup } from "../action-group/action-group";
// import { TaskStatus, WorkflowType } from "@/type";
// import { StatusTagger } from "../statue-tagger/status-tagger";
// import { usePollingConfig } from "@/hooks/swr/use-polling-config";
// import { useSWRPolling } from "@/hooks/swr/use-swr-polling";

// interface CardGroupProps {
//   taskId: string;
//   comparisonUrl: string;
//   workflowType: WorkflowType;
//   resultUrl: string;
//   createdAt: string;
//   taskStatus: TaskStatus;

//   onVideoClick: () => void;
//   onDownloadClick: () => void;
//   onDeleteClick: () => void;
// }

// export function DualCards({
//   taskId,
//   comparisonUrl,
//   workflowType,
//   resultUrl,
//   createdAt,
//   taskStatus,

//   onVideoClick,
//   onDownloadClick,
//   onDeleteClick,
// }: CardGroupProps) {
//   const t = useTranslations("right_panel.card_group");

//   const { pollingConfig } = usePollingConfig({ taskId, workflowType });

//   useSWRPolling({ taskId, config: pollingConfig!, taskStatus });

//   return (
//     <div className="flex flex-col gap-y-2">
//       <StatusTagger taskStatus={taskStatus} />

//       <div className="flex flex-row gap-x-4">
//         <HistoryCard
//           label={t("comparison")}
//           mediaUrl={comparisonUrl}
//           mediaType="image"
//           taskStatus={taskStatus}
//         />
//         <HistoryCard
//           label={t("result")}
//           mediaUrl={resultUrl}
//           mediaType="image"
//           taskStatus={taskStatus}
//         />
//       </div>

//       <div className="flex flex-row items-center justify-between">
//         <p className="text-sm text-muted-foreground">{createdAt}</p>
//         <ActionGroup
//           onVideoClick={onVideoClick}
//           onDownloadClick={onDownloadClick}
//           onDeleteClick={onDeleteClick}
//           isShowVideo={taskStatus === "SUCCESS"}
//           isShowDownload={taskStatus === "SUCCESS"}
//           isShowDelete={taskStatus === "SUCCESS" || taskStatus === "FAILED"}
//         />
//       </div>
//     </div>
//   );
// }
