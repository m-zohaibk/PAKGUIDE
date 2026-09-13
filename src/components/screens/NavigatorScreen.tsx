'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Camera,
  FileText,
  CheckSquare,
  Square,
  Clock,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Download,
  Smartphone,
  ListOrdered,
  Copy,
  Check,
  Mic,
  MicOff
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SuniyeButton } from '@/components/common/SuniyeButton';
import { AssistantMessage } from '@/components/common/AssistantMessage';
import { createSpeechRecognizer } from '@/lib/audio/speech';
import { GovService, ChatMessage, DocumentAuditResult } from '@/types';
import { OFFICIAL_SERVICES } from '@/data/pakistanGovData';
import { fetchServicesFromFirestore } from '@/lib/firebase/firestoreService';

const isAppleStoreUrl = (url?: string) => Boolean(url?.includes('apps.apple.com'));

interface NavigatorScreenProps {
  initialQuery?: string;
  apiKey: string;
}

export const NavigatorScreen: React.FC<NavigatorScreenProps> = ({ initialQuery, apiKey }) => {
  const { t, lang, isRtl } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState<GovService>(OFFICIAL_SERVICES[0]);
  const [cloudServices, setCloudServices] = useState<GovService[]>(OFFICIAL_SERVICES);
  const [isListening, setIsListening] = useState(false);
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [auditResult, setAuditResult] = useState<DocumentAuditResult | null>(null);
  const [copiedPackage, setCopiedPackage] = useState<string | null>(null);
  const [latestResponseId, setLatestResponseId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    fetchServicesFromFirestore().then((srvs) => {
      if (srvs && srvs.length > 0) {
        setCloudServices(srvs);
        if (srvs[0]) setActiveRoadmap(srvs[0]);
      }
    });
  }, []);

  // Initialize welcome message & handle initial query cleanly
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-1',
      sender: 'assistant',
      text:
        lang === 'ur'
          ? `السلام علیکم! میں پاک گائیڈ اے آئی اسسٹنٹ ہوں۔ آپ بچوں کا بے فارم (CRC)، سمارٹ شناختی کارڈ، پاسپورٹ، فرد ملکیت یا دستک سروسز کے بارے میں کچھ بھی پوچھیں — تمام جوابات، ڈاؤن لوڈ لنکس، فیس اور طریقہ کار اسی چیٹ باکس میں ظاہر ہوں گے۔`
          : lang === 'ro'
          ? `Assalam-o-Alaikum! Main PakGuide AI Assistant hoon. Aap B-Form, CNIC, Passport, Fard Malkiat ke baray mein sawal poochain — tamam app download links aur step-by-step instructions isi chatbox mein milenge.`
          : `Hello! I am PakGuide AI Assistant. Ask me anything about getting a B-Form (CRC), CNIC renewal, Passport, Land Fard, or Domicile! All instructions, official app download buttons, fee tables, and form submission steps will appear directly inside this chatbox.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([welcomeMsg]);

    if (initialQuery) {
      executeSearchQuery(initialQuery);
    }
  }, [initialQuery, lang]);

  useEffect(() => {
    if (!latestResponseId) return;
    document.getElementById(`message-${latestResponseId}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [latestResponseId]);

  const handleCopyPackage = (pkgName: string) => {
    navigator.clipboard.writeText(pkgName);
    setCopiedPackage(pkgName);
    setTimeout(() => setCopiedPackage(null), 2500);
  };

  const executeSearchQuery = async (queryText: string) => {
    const trimmedQuery = queryText.trim();
    if ((!trimmedQuery && !selectedImageBase64) || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmedQuery || 'Audit attached document photograph',
      attachedImage: selectedImageBase64 || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    const imageToAudit = selectedImageBase64;
    setSelectedImageBase64(null);

    try {
      if (imageToAudit) {
        const auditRes = await fetch('/api/gemini/audit-doc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: imageToAudit, apiKey })
        }).then((r) => r.json());

        setAuditResult(auditRes);

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text:
            lang === 'ur'
              ? `میں نے آپ کے بھیجے گئے **${auditRes.docName}** کا ان-میموری معائنہ مکمل کر لیا ہے۔ مکمل اسکور: ${auditRes.completenessScore}%\n\n${auditRes.recommendations.join('\n')}`
              : `I have audited your **${auditRes.docName}** in-memory. Completeness score: ${auditRes.completenessScore}%.\n\nKey Recommendations:\n• ${auditRes.recommendations.join('\n• ')}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        setLatestResponseId(aiMsg.id);
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const historyPayload = messagesRef.current.map((m) => ({
          role: m.sender === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: m.text }]
        }));

        let res: any = {};
        try {
          const apiResponse = await fetch('/api/gemini/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: trimmedQuery, history: historyPayload, apiKey, lang })
          });
          if (apiResponse.ok) {
            res = await apiResponse.json();
          }
        } catch (err) {
          console.warn('Chat fetch network fallback triggered:', err);
        }

        // The server decides whether a verified roadmap matches. Never attach
        // a default service to an unrelated question in the client.
        const targetRoadmap = res.roadmap;

        const defaultReplyText =
          lang === 'ur'
            ? 'آپ کے سوال کا جواب تیار کر دیا گیا ہے۔'
            : lang === 'ro'
              ? 'Aap ke sawal ka jawab tayar kar diya gaya hai.'
              : 'Here is the answer to your question.';

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: res.replyText || defaultReplyText,
          roadmapData: targetRoadmap,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (targetRoadmap) {
          setActiveRoadmap(targetRoadmap);
        }

        setLatestResponseId(aiMsg.id);
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error('Chat send error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'assistant',
          text:
            lang === 'ur'
              ? 'معذرت، جواب حاصل نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔'
              : 'Sorry, I could not prepare a response right now. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMicToggle = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    const recognizer = createSpeechRecognizer(
      lang,
      (text) => {
        setInputText(text);
        setIsListening(false);
      },
      () => setIsListening(false),
      () => setIsListening(false)
    );
    if (recognizer) {
      setIsListening(true);
      try {
        recognizer.start();
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleChecklistItemInMsg = (msgId: string, itemId: string) => {
    setMessages((prevMsgs) =>
      prevMsgs.map((msg) => {
        if (msg.id === msgId && msg.roadmapData) {
          const updatedChecklist = msg.roadmapData.checklist.map((c) =>
            c.id === itemId ? { ...c, isChecked: !c.isChecked } : c
          );
          return {
            ...msg,
            roadmapData: { ...msg.roadmapData, checklist: updatedChecklist }
          };
        }
        return msg;
      })
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-8 sm:pb-12 animate-fadeIn">
      {/* Header Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t('chatTitle')}</h2>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
              Smart AI Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            All answers, Play Store links, fee tables & form steps are rendered directly inside this chatbox!
          </p>
        </div>

        {/* Quick Service Preset Chips */}
        <div className="w-full sm:w-auto flex flex-nowrap sm:flex-wrap items-center gap-2 text-xs overflow-x-auto no-scrollbar pb-1">
          {OFFICIAL_SERVICES.map((srv) => (
            <button
              key={srv.id}
              onClick={() => {
                setActiveRoadmap(srv);
                executeSearchQuery(`Tell me app download links, instructions and form submission for ${srv.title}`);
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold border transition-all shrink-0 ${
                activeRoadmap.id === srv.id
                  ? 'bg-pakgreen-800 text-white border-pakgreen-900 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {lang === 'ur' ? srv.titleUrdu : srv.title}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CHATBOX CONTAINER */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex flex-col min-h-[calc(100svh-250px)] sm:min-h-[680px] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              id={`message-${msg.id}`}
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                  className={`max-w-[98%] sm:max-w-[88%] rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-md relative space-y-4 ${
                  msg.sender === 'user'
                    ? 'bg-pakgreen-800 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                {/* Attached Image Thumbnail */}
                {msg.attachedImage && (
                  <div className="rounded-2xl overflow-hidden border border-white/20 max-w-[220px]">
                    <img src={msg.attachedImage} alt="Audited doc" className="w-full h-auto object-cover" />
                    <span className="block text-[10px] bg-slate-900/80 text-white text-center py-1 font-mono">
                      In-Memory Document Audit
                    </span>
                  </div>
                )}

                {/* Primary Assistant Text Explanation */}
                <div className="flex items-start justify-between gap-3">
                  <AssistantMessage
                    text={msg.text}
                    excludePackageName={msg.roadmapData?.officialAppPackageName}
                    excludePlayStoreUrl={msg.roadmapData?.playStoreUrl}
                  />

                  {msg.sender === 'assistant' && (
                    <SuniyeButton
                      textToSpeak={msg.text}
                      variant="compact"
                    />
                  )}
                </div>

                {/* INLINE EMBEDDED ANSWER CARD DIRECTLY INSIDE THE CHATBOX MESSAGE BUBBLE */}
                {msg.sender === 'assistant' && msg.roadmapData && (
                  <div className="mt-4 pt-4 border-t border-slate-200 text-slate-800 space-y-4 animate-fadeIn">
                    {/* Card Header & Dept */}
                    <div className="p-4 bg-gradient-to-r from-pakgreen-950 via-pakgreen-900 to-slate-900 text-white rounded-2xl space-y-2 border border-pakgreen-800 shadow">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-pakgold-500 text-slate-950 rounded-full uppercase tracking-wider">
                          {msg.roadmapData.jurisdiction} {msg.roadmapData.category}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-300">
                          Verified Department: {msg.roadmapData.department}
                        </span>
                      </div>
                      <h4 className="font-black text-base sm:text-lg text-white leading-snug">
                        {lang === 'ur' ? msg.roadmapData.titleUrdu : msg.roadmapData.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lang === 'ur' ? msg.roadmapData.summaryUrdu : msg.roadmapData.summary}
                      </p>
                    </div>

                    {/* OFFICIAL APP & PLAY STORE DOWNLOAD LINKS BOX */}
                    {msg.roadmapData.playStoreUrl && (
                      <div className="p-4 bg-blue-950 text-white rounded-2xl space-y-3 border border-blue-900 shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-pakgold-400 font-bold text-xs">
                            <Smartphone className="w-4 h-4 text-pakgold-400" />
                            <span>Official Mobile App & Online Portal</span>
                          </div>
                          {msg.roadmapData.officialAppPackageName && (
                            <button
                              onClick={() => handleCopyPackage(msg.roadmapData!.officialAppPackageName!)}
                              className="text-[10px] font-mono text-slate-300 bg-blue-900/80 px-2 py-0.5 rounded-lg border border-blue-700 flex items-center gap-1 hover:text-white"
                            >
                              {copiedPackage === msg.roadmapData.officialAppPackageName ? (
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Copied ID
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Copy className="w-3 h-3 text-slate-400" /> ID: {msg.roadmapData.officialAppPackageName}
                                </span>
                              )}
                            </button>
                          )}
                        </div>

                        <p className="text-xs font-bold text-white">
                          {msg.roadmapData.officialAppName}
                        </p>

                        {msg.roadmapData.formSubmissionProcedure && (
                          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-200 text-xs space-y-1">
                            <span className="font-bold text-pakgold-300 flex items-center gap-1 text-[11px]">
                              <ListOrdered className="w-3.5 h-3.5" /> Next Steps & Form Submission Procedure:
                            </span>
                            <p className="text-[11px] leading-relaxed text-slate-300">
                              {lang === 'ur'
                                ? msg.roadmapData.formSubmissionProcedureUrdu || msg.roadmapData.formSubmissionProcedure
                                : msg.roadmapData.formSubmissionProcedure}
                            </p>
                          </div>
                        )}

                        {/* Store Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <a
                            href={msg.roadmapData.playStoreUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2.5 bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                          >
                            <Download className="w-4 h-4" />
                            <span>Google Play (Android)</span>
                          </a>

                          <a
                            href={msg.roadmapData.appStoreUrl || msg.roadmapData.officialPortalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-800"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                            <span>{isAppleStoreUrl(msg.roadmapData.appStoreUrl) ? 'App Store (iOS)' : 'Official Website'}</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* REQUIRED DOCUMENTS CHECKLIST */}
                    {msg.roadmapData.checklist && msg.roadmapData.checklist.length > 0 && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                            <CheckSquare className="w-4 h-4 text-pakgreen-800" />
                            <span>Required Papers & Documents Checklist:</span>
                          </h5>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {msg.roadmapData.checklist.filter((c) => c.isChecked).length} / {msg.roadmapData.checklist.length} Completed
                          </span>
                        </div>

                        <div className="space-y-2">
                          {msg.roadmapData.checklist.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => toggleChecklistItemInMsg(msg.id, item.id)}
                              className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 text-xs ${
                                item.isChecked
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                              }`}
                            >
                              {item.isChecked ? (
                                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <p className={item.isChecked ? 'line-through opacity-80' : 'font-medium'}>
                                  {lang === 'ur' ? item.labelUrdu : item.label}
                                </p>
                                {item.notes && (
                                  <p className="text-[10px] text-slate-500 mt-0.5">{item.notes}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* OFFICIAL FEE SCHEDULE TABLE */}
                    {msg.roadmapData.fees && (
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-pakgold-600" />
                            <span>Official Government PKR Fee Schedule:</span>
                          </h5>
                          <span className="text-[10px] text-slate-500">
                            Est. Turnaround: {lang === 'ur' ? msg.roadmapData.turnaroundEstimateUrdu : msg.roadmapData.turnaroundEstimate}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{t('feeNormal')}</p>
                            <p className="font-extrabold text-sm text-slate-900 mt-1 font-mono">
                              PKR {msg.roadmapData.fees.normal}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {msg.roadmapData.fees.deliveryTimeDaysNormal}
                            </p>
                          </div>

                          <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                            <p className="text-[10px] font-bold text-amber-800 uppercase">{t('feeUrgent')}</p>
                            <p className="font-extrabold text-sm text-amber-950 mt-1 font-mono">
                              PKR {msg.roadmapData.fees.urgent}
                            </p>
                            <p className="text-[10px] text-amber-700 mt-0.5">
                              {msg.roadmapData.fees.deliveryTimeDaysUrgent}
                            </p>
                          </div>

                          {msg.roadmapData.fees.executive ? (
                            <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                              <p className="text-[10px] font-bold text-emerald-800 uppercase">{t('feeExecutive')}</p>
                              <p className="font-extrabold text-sm text-emerald-950 mt-1 font-mono">
                                PKR {msg.roadmapData.fees.executive}
                              </p>
                              <p className="text-[10px] text-emerald-700 mt-0.5">
                                {msg.roadmapData.fees.deliveryTimeDaysExecutive}
                              </p>
                            </div>
                          ) : (
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 text-[10px]">
                              N/A
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Official Portal Web Link CTA */}
                    {msg.roadmapData.officialPortalUrl && (
                      <a
                        href={msg.roadmapData.officialPortalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 bg-pakgreen-800 hover:bg-pakgreen-900 text-white font-bold rounded-xl shadow flex items-center justify-center gap-2 text-xs transition-all"
                      >
                        <span>Open Official Government Portal ({msg.roadmapData.verifiedGovDomain})</span>
                        <ExternalLink className="w-3.5 h-3.5 text-pakgold-400" />
                      </a>
                    )}
                  </div>
                )}

                <span className="block text-[10px] opacity-70 mt-2 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-3.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-600 font-bold w-fit animate-pulse shadow-sm">
              <RefreshCw className="w-4 h-4 text-pakgreen-800 animate-spin" />
              <span>Fetching instructions, Play Store links & fee schedule...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Controls */}
        <div className="p-4 bg-white border-t border-slate-200">
          {selectedImageBase64 && (
            <div className="mb-2 p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
              <span className="truncate font-semibold">Document image ready for OCR audit</span>
              <button
                type="button"
                onClick={() => setSelectedImageBase64(null)}
                className="text-emerald-700 hover:text-emerald-950 font-bold"
              >
                Remove
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeSearchQuery(inputText);
            }}
            className="flex items-center gap-2"
          >

            {/* Input Text */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('chatPlaceholder')}
              className="flex-1 min-w-0 w-full py-3 px-3 sm:px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pakgreen-600 focus:bg-white transition-all"
            />

            {/* Mic Toggle Button */}
            <button
              type="button"
              onClick={handleMicToggle}
              className={`p-3 rounded-2xl transition-all shrink-0 ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading}
              className="p-3 bg-pakgreen-800 hover:bg-pakgreen-900 text-white rounded-2xl shadow-md shrink-0 transition-all font-bold flex items-center justify-center gap-1.5"
            >
              <Send className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
