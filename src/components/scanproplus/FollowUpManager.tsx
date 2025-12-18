import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MoreVertical, Calendar, Clock, User, Paperclip, 
  ChevronDown, ChevronUp, Send, Download, Upload,
  CheckCircle2, AlertTriangle, AlertCircle, Timer
} from "lucide-react";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface Attachment {
  name: string;
  size: string;
  type: string;
}

interface HistoryItem {
  action: string;
  user: string;
  timestamp: string;
}

const FollowUpManager = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const statusOptions = [
    { label: "In Progress", color: "#1391BF", icon: Timer },
    { label: "Completed", color: "#7CC2A7", icon: CheckCircle2 },
    { label: "Overdue", color: "#C4564F", icon: AlertCircle },
    { label: "Pending Review", color: "#D8A860", icon: AlertTriangle },
  ];

  const currentStatus = statusOptions[0];

  const comments: Comment[] = [
    { id: "1", user: "Anna Schmidt", avatar: "AS", text: "Calibration certificates have been requested from the supplier. Expecting response by Friday.", timestamp: "2 days ago" },
    { id: "2", user: "Marcus Chen", avatar: "MC", text: "Received partial documentation. Still waiting for the 2024 calibration records.", timestamp: "1 day ago" },
    { id: "3", user: "Sarah Johnson", avatar: "SJ", text: "Follow-up email sent. Escalated to supplier quality manager.", timestamp: "3 hours ago" },
  ];

  const attachments: Attachment[] = [
    { name: "Calibration_Report_2023.pdf", size: "2.4 MB", type: "pdf" },
    { name: "Equipment_List.xlsx", size: "156 KB", type: "xlsx" },
    { name: "NC_Response_Draft.docx", size: "89 KB", type: "docx" },
  ];

  const historyLog: HistoryItem[] = [
    { action: "Status changed to In Progress", user: "Anna Schmidt", timestamp: "Dec 15, 2024 09:30" },
    { action: "Attachment added: Calibration_Report_2023.pdf", user: "Marcus Chen", timestamp: "Dec 14, 2024 16:45" },
    { action: "Finding assigned to Anna Schmidt", user: "System", timestamp: "Dec 13, 2024 11:20" },
    { action: "Finding created from audit NC-2024-0142", user: "James Wilson", timestamp: "Dec 13, 2024 10:15" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0A0A0A] rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#C0C0C0]/10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white">NC-2024-0142: Missing Calibration Records</h3>
              <div 
                className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                style={{ backgroundColor: `${currentStatus.color}20`, color: currentStatus.color }}
              >
                <currentStatus.icon className="w-3 h-3" />
                {currentStatus.label}
              </div>
            </div>
            <p className="text-sm text-[#C0C0C0]/60">Precision Parts GmbH • ISO 9001:2015 Clause 7.1.5</p>
          </div>
          <button className="p-2 hover:bg-[#C0C0C0]/10 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-[#C0C0C0]/60" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#161616] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#C0C0C0]/60 text-xs mb-2">
              <User className="w-3.5 h-3.5" />
              Assigned To
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-[#1391BF] text-xs font-medium">AS</div>
              <span className="text-white text-sm font-medium">Anna Schmidt</span>
            </div>
          </div>

          <div className="bg-[#161616] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#C0C0C0]/60 text-xs mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Due Date
            </div>
            <span className="text-white text-sm font-medium">Dec 20, 2024</span>
          </div>

          <div className="bg-[#161616] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#C0C0C0]/60 text-xs mb-2">
              <Clock className="w-3.5 h-3.5" />
              Days Remaining
            </div>
            <span className="text-[#D8A860] text-sm font-medium">2 days</span>
          </div>

          <div className="bg-[#161616] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#C0C0C0]/60 text-xs mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Priority
            </div>
            <span className="text-[#C4564F] text-sm font-medium">High</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#161616] rounded-xl p-5">
          <h4 className="text-sm font-medium text-white mb-3">Description</h4>
          <p className="text-sm text-[#C0C0C0]/80 leading-relaxed">
            During the audit of Clause 7.1.5 (Monitoring and measuring resources), it was identified that calibration records for 3 critical measuring devices are missing or expired. The supplier must provide valid calibration certificates for: Digital Caliper (SN: DC-2019-445), Torque Wrench Set (SN: TW-2020-112), and CMM Probe (SN: CM-2018-089).
          </p>
        </div>

        {/* Progress Tracking */}
        <div className="bg-[#161616] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white">Progress</h4>
            <span className="text-[#1391BF] text-sm font-semibold">75%</span>
          </div>
          <div className="w-full h-2 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#1391BF] rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#C0C0C0]/60">
            <span>3 of 4 items completed</span>
            <span>1 pending</span>
          </div>
        </div>

        {/* Attachments & Evidence */}
        <div className="bg-[#161616] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#C0C0C0]/60" />
              Attachments & Evidence
            </h4>
            <button className="text-xs text-[#1391BF] hover:text-[#1391BF]/80 flex items-center gap-1">
              <Upload className="w-3 h-3" />
              Upload File
            </button>
          </div>

          <div className="space-y-2">
            {attachments.map((file, index) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-[#0A0A0A] rounded-lg hover:bg-[#0A0A0A]/80 transition-colors group"
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                  file.type === 'pdf' ? 'bg-[#C4564F]/20 text-[#C4564F]' :
                  file.type === 'xlsx' ? 'bg-[#7CC2A7]/20 text-[#7CC2A7]' :
                  'bg-[#1391BF]/20 text-[#1391BF]'
                }`}>
                  {file.type.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{file.name}</p>
                  <p className="text-xs text-[#C0C0C0]/60">{file.size}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-[#C0C0C0]/10 rounded transition-all">
                  <Download className="w-4 h-4 text-[#C0C0C0]/60" />
                </button>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-3 border-2 border-dashed border-[#C0C0C0]/20 rounded-lg p-4 text-center hover:border-[#1391BF]/50 transition-colors">
            <p className="text-sm text-[#C0C0C0]/60">Drop files here or click to upload</p>
          </button>
        </div>

        {/* Comments & Notes */}
        <div className="bg-[#161616] rounded-xl p-5">
          <h4 className="text-sm font-medium text-white mb-4">Comments & Notes</h4>

          <div className="space-y-4 mb-4">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-[#1391BF] text-xs font-medium flex-shrink-0">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{comment.user}</span>
                    <span className="text-xs text-[#C0C0C0]/40">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-[#C0C0C0]/80">{comment.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-[#0A0A0A] border border-[#C0C0C0]/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[#C0C0C0]/40 focus:outline-none focus:border-[#1391BF]/50"
            />
            <button className="p-2.5 bg-[#1391BF] rounded-lg hover:bg-[#1391BF]/90 transition-colors">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* History Log */}
        <div className="bg-[#161616] rounded-xl overflow-hidden">
          <button 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="w-full p-5 flex items-center justify-between hover:bg-[#C0C0C0]/5 transition-colors"
          >
            <h4 className="text-sm font-medium text-white">History Log</h4>
            {isHistoryOpen ? (
              <ChevronUp className="w-4 h-4 text-[#C0C0C0]/60" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#C0C0C0]/60" />
            )}
          </button>

          <AnimatePresence>
            {isHistoryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-3">
                  {historyLog.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#C0C0C0]/30 mt-1.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[#C0C0C0]/80">{item.action}</p>
                        <p className="text-xs text-[#C0C0C0]/40">{item.user} • {item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default FollowUpManager;
