"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const constants_1 = require("../../../shared/constants");
const REMINDER_OPTS = ['5 phút', '10 phút', '30 phút', '1 giờ', '1 ngày'];
const REPEAT_OPTS = ['Không', 'Hàng ngày', 'Hàng tuần', 'Hàng tháng'];
const TaskEditorScreen = ({ onTaskUpdated }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const editTask = location.state?.task;
    const getLocalYMD = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };
    const [taskName, setTaskName] = (0, react_1.useState)(editTask?.name || '');
    const [description, setDescription] = (0, react_1.useState)(editTask?.description || '');
    const [date, setDate] = (0, react_1.useState)(editTask?.startDate || getLocalYMD(new Date()));
    const [endDate, setEndDate] = (0, react_1.useState)(editTask?.endDate || editTask?.startDate || getLocalYMD(new Date()));
    const [startTime, setStartTime] = (0, react_1.useState)(editTask?.startTime || '');
    const [endTime, setEndTime] = (0, react_1.useState)(editTask?.endTime || '');
    const [customCategory, setCustomCategory] = (0, react_1.useState)(editTask?.tags || ''); // Using tags column for custom category
    const [categoryId, setCategoryId] = (0, react_1.useState)(editTask?.categoryId || 1);
    const [customColor, setCustomColor] = (0, react_1.useState)(editTask?.color || constants_1.SYSTEM_CATEGORIES[0].color);
    const [reminderOn, setReminderOn] = (0, react_1.useState)(false);
    const [reminderAt, setReminderAt] = (0, react_1.useState)(REMINDER_OPTS[0]);
    const [repeatOn, setRepeatOn] = (0, react_1.useState)(!!editTask?.repeat && editTask.repeat !== 'none');
    const [repeatFreq, setRepeatFreq] = (0, react_1.useState)(editTask?.repeat && editTask.repeat !== 'none' ? editTask.repeat : REPEAT_OPTS[0]);
    const activeCategory = constants_1.SYSTEM_CATEGORIES.find(c => c.id === categoryId);
    const activeCategoryName = customCategory.trim() || activeCategory?.name || 'Chưa thiết lập';
    (0, react_1.useEffect)(() => {
        // Sync end date when start date changes (if end date was equal to previous start date or if not set)
        if (!editTask) {
            setEndDate(date);
        }
    }, [date, editTask]);
    const handleSave = async () => {
        if (!taskName)
            return;
        if (window.api && window.api.tasks) {
            const finalEndTime = endTime || '23:59';
            const payload = {
                categoryId: categoryId,
                name: taskName,
                description: description,
                repeat: repeatOn ? repeatFreq : 'none',
                startDate: date,
                endDate: endDate || date,
                startTime: startTime,
                endTime: finalEndTime,
                tags: customCategory.trim(), // Save custom string instead of JSON array
                color: customColor,
                status: editTask ? editTask.status : false
            };
            if (editTask) {
                await window.api.tasks.update(editTask.id, payload);
            }
            else {
                await window.api.tasks.create(payload);
            }
            onTaskUpdated();
            navigate('/yearly');
        }
    };
    const currentTheme = customColor;
    const isInvalid = !taskName.trim();
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '24px', height: '100%', alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "glass card", style: {
                    flex: 1.2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    maxHeight: '100%',
                    overflowY: 'auto'
                }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { color: 'var(--text-main)', marginBottom: '8px', fontSize: '1.8rem', fontWeight: 700 }, children: "T\u1EA1o T\u00E1c V\u1EE5 M\u1EDBi" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [(0, jsx_runtime_1.jsx)("input", { className: "form-input", style: { fontSize: '1.2rem', padding: '16px', fontWeight: 600, borderLeft: `4px solid ${currentTheme}` }, type: "text", placeholder: "T\u00EAn t\u00E1c v\u1EE5 (B\u1EAFt bu\u1ED9c)...", value: taskName, onChange: (e) => setTaskName(e.target.value) }), (0, jsx_runtime_1.jsx)("textarea", { className: "form-input", placeholder: "M\u00F4 t\u1EA3 chi ti\u1EBFt", rows: 3, value: description, onChange: (e) => setDescription(e.target.value) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '16px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)("label", { style: { fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 16 }), " B\u1EAFt \u0111\u1EA7u"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)("input", { className: "form-input", type: "date", value: date, onChange: (e) => setDate(e.target.value), style: { flex: 2 } }), (0, jsx_runtime_1.jsx)("input", { className: "form-input", type: "time", value: startTime, onChange: (e) => setStartTime(e.target.value), style: { flex: 1 } })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)("label", { style: { fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { size: 16 }), " K\u1EBFt th\u00FAc"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)("input", { className: "form-input", type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value), style: { flex: 2 } }), (0, jsx_runtime_1.jsx)("input", { className: "form-input", type: "time", value: endTime, onChange: (e) => setEndTime(e.target.value), placeholder: "23:59", style: { flex: 1 } })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: { fontSize: '1rem', fontWeight: 600, marginBottom: '12px', display: 'block' }, children: "Ph\u00E2n lo\u1EA1i t\u00E1c v\u1EE5" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '12px' }, children: [constants_1.SYSTEM_CATEGORIES.map(c => ((0, jsx_runtime_1.jsx)("button", { onClick: () => { setCategoryId(c.id); setCustomColor(c.color); }, style: {
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            border: '1px solid transparent',
                                            background: categoryId === c.id ? `${c.color}40` : 'var(--bg-gradient-start)',
                                            color: categoryId === c.id ? c.color : 'var(--text-muted)',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            transition: 'all 0.2s ease'
                                        }, children: c.name }, c.id))), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "+ G\u00F5 t\u00F9y ch\u1EC9nh...", value: customCategory, onChange: e => setCustomCategory(e.target.value), style: {
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            border: '1px dashed var(--text-muted)',
                                            background: customCategory.trim() ? `${currentTheme}20` : 'transparent',
                                            color: customCategory.trim() ? currentTheme : 'var(--text-main)',
                                            fontWeight: 600,
                                            outline: 'none',
                                            minWidth: '150px'
                                        } })] }), customCategory.trim() && (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }, children: ["* T\u00EAn ph\u00E2n lo\u1EA1i m\u1EB7c \u0111\u1ECBnh s\u1EBD d\u00E1n nh\u00E3n l\u00E0 \"", customCategory, "\"."] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: { fontSize: '1rem', fontWeight: 600, marginBottom: '12px', display: 'block' }, children: "B\u1EA3ng m\u00E0u c\u00E1 nh\u00E2n h\u00F3a" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "color", value: customColor, onChange: e => setCustomColor(e.target.value), style: {
                                            width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '50%', cursor: 'pointer',
                                            WebkitAppearance: 'none'
                                        } }), (0, jsx_runtime_1.jsx)("span", { style: { color: 'var(--text-muted)', fontSize: '0.9rem' }, children: "B\u1EA1n c\u00F3 th\u1EC3 ch\u1ECDn m\u00E0u b\u1EA5t k\u1EF3!" })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(255,255,255,0.4)', padding: '20px', borderRadius: '16px' }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { size: 18, color: currentTheme }), " Nh\u1EAFc nh\u1EDF"] }), (0, jsx_runtime_1.jsxs)("label", { className: "toggle-switch", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: reminderOn, onChange: e => setReminderOn(e.target.checked) }), (0, jsx_runtime_1.jsx)("span", { className: "slider round" })] })] }), reminderOn && ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }, children: REMINDER_OPTS.map(opt => ((0, jsx_runtime_1.jsx)("span", { onClick: () => setReminderAt(opt), style: {
                                                padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', cursor: 'pointer',
                                                background: reminderAt === opt ? currentTheme : 'var(--surface-bg)',
                                                color: reminderAt === opt ? 'white' : 'var(--text-muted)'
                                            }, children: opt }, opt))) }))] }), (0, jsx_runtime_1.jsx)("div", { style: { width: '100%', height: '1px', background: 'var(--surface-border)' } }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Repeat, { size: 18, color: currentTheme }), " L\u1EB7p l\u1EA1i"] }), (0, jsx_runtime_1.jsxs)("label", { className: "toggle-switch", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: repeatOn, onChange: e => setRepeatOn(e.target.checked) }), (0, jsx_runtime_1.jsx)("span", { className: "slider round" })] })] }), repeatOn && ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }, children: REPEAT_OPTS.map(opt => ((0, jsx_runtime_1.jsx)("span", { onClick: () => setRepeatFreq(opt), style: {
                                                padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', cursor: 'pointer',
                                                background: repeatFreq === opt ? currentTheme : 'var(--surface-bg)',
                                                color: repeatFreq === opt ? 'white' : 'var(--text-muted)'
                                            }, children: opt }, opt))) }))] })] }), (0, jsx_runtime_1.jsx)("button", { className: "btn-primary", onClick: handleSave, disabled: isInvalid, style: {
                            marginTop: 'auto',
                            padding: '16px',
                            fontSize: '1.1rem',
                            background: isInvalid ? 'var(--text-muted)' : currentTheme,
                            opacity: isInvalid ? 0.5 : 1,
                            cursor: isInvalid ? 'not-allowed' : 'pointer',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600
                        }, children: isInvalid ? 'Nhập tên tác vụ để lưu' : (editTask ? 'CẬP NHẬT TÁC VỤ' : 'TẠO TÁC VỤ') })] }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                        padding: '24px',
                        borderRadius: '24px',
                        background: isInvalid ? 'rgba(255, 82, 82, 0.1)' : `${customColor}1A`,
                        border: `2px dashed ${isInvalid ? '#ff5252' : customColor}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '350px',
                        transition: 'all 0.3s ease',
                        textAlign: 'center'
                    }, children: isInvalid ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { width: '60px', height: '60px', borderRadius: '50%', background: '#ff5252', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '24px', color: 'white', fontWeight: 'bold' }, children: "!" }) }), (0, jsx_runtime_1.jsx)("h3", { style: { color: '#ff5252', marginBottom: '8px' }, children: "Ch\u01B0a c\u00F3 g\u00EC c\u1EA3!" }), (0, jsx_runtime_1.jsx)("p", { style: { color: 'var(--text-muted)', maxWidth: '250px' }, children: "H\u00E3y nh\u1EADp t\u00EAn t\u00E1c v\u1EE5 b\u00EAn tr\u00E1i \u0111\u1EC3 xem tr\u01B0\u1EDBc th\u1EBB c\u00F4ng vi\u1EC7c c\u1EE7a b\u1EA1n." })] })) : ((0, jsx_runtime_1.jsxs)("div", { style: { width: '100%', background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'left', borderLeft: `6px solid ${customColor}` }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: { display: 'inline-block', padding: '4px 10px', borderRadius: '12px', background: `${customColor}20`, color: customColor, fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }, children: activeCategoryName }), (0, jsx_runtime_1.jsx)("h3", { style: { fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }, children: taskName })] }), reminderOn && (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { size: 18, color: customColor })] }), description && (0, jsx_runtime_1.jsx)("p", { style: { color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }, children: description }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '4px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 14 }), " ", date, " ", startTime && (0, jsx_runtime_1.jsxs)("span", { children: [" ", startTime] }), (endDate !== date || endTime) && ((0, jsx_runtime_1.jsxs)("span", { children: [" - ", endDate !== date ? endDate : '', " ", endTime || '23:59'] }))] }), repeatOn && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '4px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Repeat, { size: 14 }), " ", repeatFreq] }))] })] })) }) })] }));
};
exports.default = TaskEditorScreen;
