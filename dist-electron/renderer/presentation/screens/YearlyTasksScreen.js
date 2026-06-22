"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const constants_1 = require("../../../shared/constants");
const YearlyTasksScreen = ({ tasks, onTaskUpdated }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    // State quản lý chọn nhiều & sắp xếp
    const [isSelectionMode, setIsSelectionMode] = (0, react_1.useState)(false);
    const [selectedIds, setSelectedIds] = (0, react_1.useState)([]);
    const [sortBy, setSortBy] = (0, react_1.useState)('date');
    // Hàm định dạng phân cấp thời gian
    const formatDuration = (ms) => {
        if (ms <= 0)
            return "0 phút";
        const sec = Math.floor(ms / 1000);
        const min = Math.floor(sec / 60);
        const hr = Math.floor(min / 60);
        const day = Math.floor(hr / 24);
        if (day >= 1)
            return `${day} ngày`;
        if (hr >= 1)
            return `${hr} giờ`;
        return `${Math.max(1, min)} phút`;
    };
    const getCategoryTheme = (id, customColor) => {
        if (customColor)
            return customColor;
        const cat = constants_1.SYSTEM_CATEGORIES.find(c => c.id === id);
        return cat ? cat.color : constants_1.SYSTEM_CATEGORIES[0].color;
    };
    const getCategoryName = (id) => {
        const cat = constants_1.SYSTEM_CATEGORIES.find(c => c.id === id);
        return cat ? cat.name : 'Chưa thiết lập';
    };
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
            if (window.api?.tasks) {
                await window.api.tasks.delete(id);
                if (onTaskUpdated)
                    onTaskUpdated();
            }
        }
    };
    const handleEdit = (e, task) => {
        e.stopPropagation();
        navigate('/editor', { state: { task } });
    };
    const handleToggleGlobalStatus = async (e, task) => {
        e.stopPropagation();
        if (window.api?.tasks) {
            const isCurrentlyCompleted = task.status;
            let newCompletedDays = [];
            if (!isCurrentlyCompleted) {
                // Mark all days as completed
                const sd = new Date(task.startDate);
                const ed = new Date(task.endDate || task.startDate);
                let current = sd;
                while (current <= ed) {
                    const dStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
                    newCompletedDays.push(dStr);
                    current.setDate(current.getDate() + 1);
                }
            }
            else {
                // Unmark all days
                newCompletedDays = [];
            }
            await window.api.tasks.update(task.id, {
                status: !isCurrentlyCompleted,
                completedDays: JSON.stringify(newCompletedDays)
            });
            if (onTaskUpdated)
                onTaskUpdated();
        }
    };
    // Chọn/bỏ chọn một tác vụ
    const handleSelectToggle = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };
    // Sắp xếp danh sách tác vụ cục bộ (đẩy hoàn thành và quá hạn xuống cuối)
    const sortedTasks = (0, react_1.useMemo)(() => {
        const list = [...tasks];
        const now = new Date().getTime();
        const compareFn = (a, b) => {
            if (sortBy === 'date') {
                const timeA = new Date(a.startDate + 'T' + (a.startTime || '00:00')).getTime();
                const timeB = new Date(b.startDate + 'T' + (b.startTime || '00:00')).getTime();
                return timeB - timeA; // Mới nhất / gần đây nhất lên đầu (Giảm dần)
            }
            if (sortBy === 'endDate') {
                const endA = new Date((a.endDate || a.startDate) + 'T' + (a.endTime || '23:59')).getTime();
                const endB = new Date((b.endDate || b.startDate) + 'T' + (b.endTime || '23:59')).getTime();
                return Math.abs(endA - now) - Math.abs(endB - now); // Gần với hôm nay nhất lên đầu
            }
            if (sortBy === 'duration') {
                const endA = new Date((a.endDate || a.startDate) + 'T' + (a.endTime || '23:59')).getTime();
                const endB = new Date((b.endDate || b.startDate) + 'T' + (b.endTime || '23:59')).getTime();
                const remainingA = endA - now;
                const remainingB = endB - now;
                return remainingA - remainingB; // Khoảng thời gian còn lại ít nhất lên đầu
            }
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        };
        return list.sort((a, b) => {
            const endA = new Date((a.endDate || a.startDate) + 'T' + (a.endTime || '23:59')).getTime();
            const endB = new Date((b.endDate || b.startDate) + 'T' + (b.endTime || '23:59')).getTime();
            const isOverdueA = !a.status && (endA <= now);
            const isOverdueB = !b.status && (endB <= now);
            const bottomA = a.status || isOverdueA;
            const bottomB = b.status || isOverdueB;
            if (bottomA && !bottomB)
                return 1;
            if (!bottomA && bottomB)
                return -1;
            return compareFn(a, b);
        });
    }, [tasks, sortBy]);
    // Chọn toàn bộ / Bỏ chọn toàn bộ
    const handleSelectAllToggle = () => {
        if (selectedIds.length === sortedTasks.length) {
            setSelectedIds([]);
        }
        else {
            setSelectedIds(sortedTasks.map(t => t.id));
        }
    };
    // Xử lý Xóa loạt đã chọn
    const handleBulkDelete = async () => {
        if (selectedIds.length === 0)
            return;
        if (confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} tác vụ đã chọn?`)) {
            if (window.api?.tasks) {
                for (const id of selectedIds) {
                    await window.api.tasks.delete(id);
                }
                setSelectedIds([]);
                setIsSelectionMode(false);
                if (onTaskUpdated)
                    onTaskUpdated();
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "glass card", style: { height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { color: 'var(--text-main)', fontSize: '1.6rem', fontWeight: 700, margin: 0 }, children: "L\u1ECBch N\u0103m" }), (0, jsx_runtime_1.jsxs)("span", { style: { background: 'var(--bg-gradient-start)', padding: '6px 16px', borderRadius: '20px', color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.85rem' }, children: [tasks.length, " T\u00E1c v\u1EE5"] })] }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }, children: isSelectionMode ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239, 68, 68, 0.1)', padding: '6px 16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: '0.9rem', color: '#ef4444', fontWeight: 600 }, children: ["\u0110\u00E3 ch\u1ECDn: ", selectedIds.length] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleBulkDelete, disabled: selectedIds.length === 0, style: {
                                        background: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px',
                                        fontWeight: 600, fontSize: '0.85rem', cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer',
                                        opacity: selectedIds.length === 0 ? 0.6 : 1, transition: 'all 0.2s'
                                    }, children: "X\u00F3a \u0111\u00E3 ch\u1ECDn" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => { setIsSelectionMode(false); setSelectedIds([]); }, style: {
                                        background: 'rgba(255,255,255,0.6)', color: 'var(--text-main)', border: '1px solid var(--surface-border)',
                                        padding: '6px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer'
                                    }, children: "H\u1EE7y" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-bg)', padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--surface-border)' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { size: 14, color: "var(--text-muted)" }), (0, jsx_runtime_1.jsxs)("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), style: { background: 'none', border: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }, children: [(0, jsx_runtime_1.jsx)("option", { value: "date", children: "B\u1EAFt \u0111\u1EA7u g\u1EA7n nh\u1EA5t" }), (0, jsx_runtime_1.jsx)("option", { value: "endDate", children: "T\u1EDBi h\u1EA1n g\u1EA7n nh\u1EA5t" }), (0, jsx_runtime_1.jsx)("option", { value: "duration", children: "Th\u1EDDi l\u01B0\u1EE3ng d\u00E0i nh\u1EA5t" }), (0, jsx_runtime_1.jsx)("option", { value: "name", children: "T\u00EAn t\u00E1c v\u1EE5 A-Z" })] })] }), tasks.length > 0 && ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setIsSelectionMode(true), style: {
                                        display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-bg)', color: 'var(--text-main)',
                                        border: '1px solid var(--surface-border)', padding: '8px 16px', borderRadius: '10px', fontWeight: 600,
                                        fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                                    }, className: "btn-hover-effect", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 14 }), (0, jsx_runtime_1.jsx)("span", { children: "X\u00F3a h\u00E0ng lo\u1EA1t" })] }))] })) })] }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1, overflowY: 'auto' }, children: (0, jsx_runtime_1.jsxs)("table", { style: { borderSpacing: '0 12px', width: '100%' }, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { style: { color: 'var(--text-muted)', fontSize: '0.9rem' }, children: [isSelectionMode && ((0, jsx_runtime_1.jsx)("th", { style: { width: '50px', textAlign: 'center' }, children: (0, jsx_runtime_1.jsx)("div", { onClick: handleSelectAllToggle, style: { cursor: 'pointer', display: 'flex', justifyContent: 'center' }, children: selectedIds.length === sortedTasks.length ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckSquare, { size: 18, color: "var(--primary-color)" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Square, { size: 18 }) }) })), (0, jsx_runtime_1.jsx)("th", { style: { width: '60px', textAlign: 'center' }, children: "Xong" }), (0, jsx_runtime_1.jsx)("th", { style: { width: '22%' }, children: "T\u00E1c v\u1EE5" }), (0, jsx_runtime_1.jsx)("th", { style: { width: '12%' }, children: "Ph\u00E2n lo\u1EA1i" }), (0, jsx_runtime_1.jsx)("th", { children: "M\u00F4 t\u1EA3" }), (0, jsx_runtime_1.jsx)("th", { style: { width: '15%' }, children: "B\u1EAFt \u0111\u1EA7u" }), (0, jsx_runtime_1.jsx)("th", { style: { width: '15%' }, children: "K\u1EBFt th\u00FAc" }), (0, jsx_runtime_1.jsx)("th", { style: { width: '18%', textAlign: 'center' }, children: "Th\u1EDDi gian c\u00F2n l\u1EA1i" }), (0, jsx_runtime_1.jsx)("th", { style: { width: '80px', textAlign: 'center' }, children: "Thao t\u00E1c" })] }) }), (0, jsx_runtime_1.jsxs)("tbody", { children: [sortedTasks.map(task => {
                                    const cId = task.categoryId || 1;
                                    const theme = getCategoryTheme(cId, task.color);
                                    const cName = task.tags?.trim() || getCategoryName(cId);
                                    const isSelected = selectedIds.includes(task.id);
                                    // Tính toán thời gian
                                    const start = new Date(task.startDate + "T" + (task.startTime || "00:00"));
                                    const end = new Date((task.endDate || task.startDate) + "T" + (task.endTime || "23:59"));
                                    const totalMs = end.getTime() - start.getTime();
                                    const now = new Date();
                                    const remainingMs = end.getTime() - now.getTime();
                                    const isOverdue = remainingMs <= 0;
                                    return ((0, jsx_runtime_1.jsxs)("tr", { onClick: () => isSelectionMode && handleSelectToggle(task.id), style: {
                                            background: isSelected ? 'rgba(239, 68, 68, 0.05)' : 'var(--surface-bg)',
                                            boxShadow: 'var(--shadow-sm)',
                                            transition: 'all 0.2s ease',
                                            cursor: isSelectionMode ? 'pointer' : 'default',
                                            border: isSelected ? '1px solid rgba(239, 68, 68, 0.3)' : 'none'
                                        }, className: "table-row-hover", children: [isSelectionMode && ((0, jsx_runtime_1.jsx)("td", { style: { textAlign: 'center', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }, children: (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', justifyContent: 'center', color: isSelected ? '#ef4444' : 'var(--text-muted)' }, children: isSelected ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckSquare, { size: 18 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Square, { size: 18 }) }) })), (0, jsx_runtime_1.jsx)("td", { style: {
                                                    textAlign: 'center',
                                                    borderTopLeftRadius: isSelectionMode ? '0' : '12px',
                                                    borderBottomLeftRadius: isSelectionMode ? '0' : '12px'
                                                }, children: (0, jsx_runtime_1.jsx)("div", { onClick: (e) => {
                                                        if (isSelectionMode) {
                                                            e.stopPropagation();
                                                            handleSelectToggle(task.id);
                                                        }
                                                        else {
                                                            handleToggleGlobalStatus(e, task);
                                                        }
                                                    }, style: { cursor: 'pointer', display: 'flex', justifyContent: 'center' }, children: task.status ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { color: "var(--primary-color)", size: 20 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Circle, { color: "var(--text-muted)", size: 20 }) }) }), (0, jsx_runtime_1.jsx)("td", { style: { fontWeight: 600, color: task.status ? 'var(--text-muted)' : 'var(--text-main)', fontSize: '1.05rem', textDecoration: task.status ? 'line-through' : 'none' }, children: task.name }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: '12px', height: '12px', borderRadius: '50%', background: theme } }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme, fontWeight: 600, fontSize: '0.85rem' }, children: cName })] }) }), (0, jsx_runtime_1.jsx)("td", { style: { color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: task.status ? 'line-through' : 'none' }, children: task.description || '-' }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-main)', fontSize: '0.9rem' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 14, style: { color: 'var(--text-muted)' } }), " ", (0, jsx_runtime_1.jsx)("span", { children: task.startDate })] }), task.startTime && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '20px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { size: 12 }), " ", (0, jsx_runtime_1.jsx)("span", { children: task.startTime })] }))] }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-main)', fontSize: '0.9rem' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 14, style: { color: 'var(--text-muted)' } }), " ", (0, jsx_runtime_1.jsx)("span", { children: task.endDate || task.startDate })] }), task.endTime && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '20px' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { size: 12 }), " ", (0, jsx_runtime_1.jsx)("span", { children: task.endTime })] }))] }) }), (0, jsx_runtime_1.jsx)("td", { style: { textAlign: 'center' }, children: task.status ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                                        display: 'inline-flex', padding: '4px 12px', borderRadius: '12px',
                                                        background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontWeight: 700, fontSize: '0.78rem'
                                                    }, children: "Ho\u00E0n th\u00E0nh" })) : isOverdue ? ((0, jsx_runtime_1.jsx)("span", { style: {
                                                        display: 'inline-flex', padding: '4px 12px', borderRadius: '12px',
                                                        background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', fontWeight: 700, fontSize: '0.78rem'
                                                    }, children: "Qu\u00E1 h\u1EA1n" })) : ((0, jsx_runtime_1.jsxs)("span", { style: {
                                                        display: 'inline-flex', padding: '4px 12px', borderRadius: '12px',
                                                        background: 'rgba(0, 123, 255, 0.08)', color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.78rem'
                                                    }, children: ["C\u00F2n ", formatDuration(remainingMs), " / ", formatDuration(totalMs)] })) }), (0, jsx_runtime_1.jsx)("td", { style: { borderTopRightRadius: '12px', borderBottomRightRadius: '12px', textAlign: 'center' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'center', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                                                                if (isSelectionMode) {
                                                                    e.stopPropagation();
                                                                    handleSelectToggle(task.id);
                                                                }
                                                                else {
                                                                    handleEdit(e, task);
                                                                }
                                                            }, style: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }, title: "S\u1EEDa", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { size: 16 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                                                                if (isSelectionMode) {
                                                                    e.stopPropagation();
                                                                    handleSelectToggle(task.id);
                                                                }
                                                                else {
                                                                    handleDelete(e, task.id);
                                                                }
                                                            }, style: { background: 'none', border: 'none', cursor: 'pointer', color: '#ff5252' }, title: "X\u00F3a", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 16 }) })] }) })] }, task.id));
                                }), tasks.length === 0 && ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: isSelectionMode ? 9 : 8, style: { textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: '64px', height: '64px', borderRadius: '32px', background: 'var(--bg-gradient-start)', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 32, color: "var(--primary-color)" }) }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '1.1rem' }, children: "Ch\u01B0a c\u00F3 t\u00E1c v\u1EE5. Vui l\u00F2ng t\u1EA1o m\u1EDBi!" })] }) }) }))] })] }) })] }));
};
exports.default = YearlyTasksScreen;
