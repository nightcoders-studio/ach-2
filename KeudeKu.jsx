import React, { useState, useEffect, useRef } from 'react';
import { 
  Coffee, ShoppingBag, ChevronLeft, CheckCircle2, Clock, Star, Trophy, Plus, Minus,
  Utensils, Flame, Award, History, User, QrCode, MapPin, Sparkles, ArrowRight,
  ChefHat, Banknote, Search, Check, TrendingUp, CreditCard, Printer, Bell, X,
  Settings, Users, LayoutDashboard, Menu, Shield, Edit, Trash2, Download,
  Percent, CheckSquare, AlertTriangle, FileText, Lock, LogOut, Tag, Phone, Instagram, Heart,
  Store, Calendar, Info, UtensilsCrossed, FilePlus, Receipt, Camera, RefreshCw, Layers, CheckCircle
} from 'lucide-react';

const INITIAL_TENANTS = [
  { id: 't1', name: 'KeudeKu Modern Warkop', category: 'Coffee & Resto', rating: 4.9, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=500', desc: 'Warkop digital pertama di Aceh yang memadukan tradisi ngopi dengan efisiensi modern.' },
  { id: 't2', name: 'Sate Matang Premium', category: 'Local Food', rating: 4.7, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=500', desc: 'Sajian Sate Matang khas Aceh dengan bumbu kacang rahasia dan kuah kaldu sapi gurih.' }
];

const INITIAL_MENU_DATA = [
  { id: 1, name: 'Sanger Espresso Double', category: 'Coffee', price: 18000, badge: 'Paling Laris', points: 15, status: 'Active', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=300', desc: 'Perpaduan kopi espresso premium dengan susu kental manis resep rahasia warkop modern.' },
  { id: 2, name: 'Kupi Khop Caramel', category: 'Coffee', price: 22000, badge: 'Khas Aceh', points: 20, status: 'Active', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300', desc: 'Sensasi minum kopi terbalik khas pesisir barat Aceh dengan sentuhan sirup karamel.' },
  { id: 3, name: 'Mie Aceh Tumis Daging', category: 'Food', price: 35000, badge: 'Wajib Coba', points: 30, status: 'Active', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=300', desc: 'Mie kuning tebal khas Aceh kaya rempah, dimasak tumis dengan irisan daging sapi empuk.' },
  { id: 4, name: 'Timphan Srikaya', category: 'Snacks', price: 5000, points: 5, status: 'Active', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=300', desc: 'Kue tradisional Aceh berbalut daun pisang dengan isian srikaya manis yang lumer di mulut.' },
  { id: 5, name: 'Pulot Bakar Original', category: 'Snacks', price: 4000, points: 4, status: 'Active', image: 'https://images.unsplash.com/photo-1581447101799-6310243d803a?auto=format&fit=crop&q=80&w=300', desc: 'Ketan panggang gurih, sangat cocok dinikmati bersama kopi atau sanger hangat.' },
  { id: 6, name: 'Iced Gayo V60', category: 'Coffee', price: 25000, points: 25, status: 'Active', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=300', desc: 'Kopi Arabica Gayo yang diseduh manual secara perlahan, disajikan dingin menyegarkan.' },
];

const INITIAL_VOUCHERS = [
  { id: 1, title: 'Diskon Sanger Rp 10.000', code: 'SANGER10K', pointsCost: 100, type: 'fixed', discountValue: 10000, desc: 'Potongan harga langsung Rp 10.000 khusus menu Sanger Espresso.', status: 'Active' },
  { id: 2, title: 'Free Pulot Bakar', code: 'PULOTFREE', pointsCost: 50, type: 'free_item', discountValue: 4000, desc: 'Tukarkan voucher ini dengan 1 porsi Pulot Bakar original gratis.', status: 'Active' },
  { id: 3, title: 'Diskon Warkop 20%', code: 'MIEACEH20', pointsCost: 200, type: 'percent', discountValue: 20, desc: 'Diskon spesial 20% untuk total belanja pesanan makanan & minuman.', status: 'Active' }
];

const INITIAL_ORDERS = [
  {
    orderId: 'ORD-849204', type: 'dine_in', tableName: '04', customerName: 'Ahmad Gayo', customerPhone: '08112233445',
    items: [ { id: 1, name: 'Sanger Espresso Double', price: 18000, qty: 2 }, { id: 3, name: 'Mie Aceh Tumis Daging', price: 35000, qty: 1 } ],
    total: 78100, discountAmount: 0, pointsEarned: 60, status: 'completed', paymentStatus: 'paid', paymentMethod: 'QRIS', date: '14.22', timestamp: Date.now() - 3600000 * 2
  },
  {
    orderId: 'RES-104928', type: 'reservation', tableName: '12', customerName: 'Cut Nyak', customerPhone: '08529988776',
    items: [ { id: 2, name: 'Kupi Khop Caramel', price: 22000, qty: 1 }, { id: 4, name: 'Timphan Srikaya', price: 5000, qty: 2 } ],
    total: 35200, discountAmount: 0, dpAmount: 17600, pointsEarned: 30, status: 'reserved', paymentStatus: 'dp_paid', paymentMethod: 'Transfer Bank', notes: 'Dekat jendela', date: '15.05', timestamp: Date.now() - 1800000
  }
];

const INITIAL_CUSTOMERS = [
  { id: 'KPQ-2026-8841', name: 'Ahmad Gayo', phone: '08112233445', level: 'Warkop Enthusiast', exp: 80, points: 2450, spend: 320000 },
  { id: 'KPQ-2026-1029', name: 'Cut Nyak', phone: '08529988776', level: 'Coffee Lover', exp: 45, points: 1100, spend: 185000 },
  { id: 'KPQ-2026-5592', name: 'Zulkifli', phone: '08216541123', level: 'Regular Customer', exp: 20, points: 340, spend: 95000 },
];

const INITIAL_TABLES = [
  { id: '01', status: 'available', capacity: 2 }, { id: '02', status: 'occupied', capacity: 4 },
  { id: '03', status: 'available', capacity: 6 }, { id: '04', status: 'occupied', capacity: 4 },
  { id: '08', status: 'occupied', capacity: 2 }, { id: '12', status: 'reserved', capacity: 8 }
];

export default function App() {
  const [currentRole, setCurrentRole] = useState('customer'); // 'customer' | 'kitchen' | 'cashier' | 'admin'
  const [customerView, setCustomerView] = useState('landing_tenant'); 
  const [orderMode, setOrderMode] = useState('dine_in'); 
  
  // Real Camera & jsQR State Variables
  const [realCameraScanActive, setRealCameraScanActive] = useState(false);
  const [jsQRAvailable, setJsQRAvailable] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Core App States
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_DATA);
  const [vouchers, setVouchers] = useState(INITIAL_VOUCHERS);
  const [globalOrders, setGlobalOrders] = useState(INITIAL_ORDERS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [toast, setToast] = useState(null);

  // Settings
  const [settings, setSettings] = useState({
    shopName: 'KeudeKu Modern Warkop',
    address: 'Jl. Teuku Umar No. 12, Banda Aceh',
    wifiName: 'KeudeKu_Gayo_HighSpeed',
    wifiPass: 'kopiaceh2026',
    baseExpGain: 15,
    taxPercentage: 10,
    pointMultiplier: 1,
    brandDesc: 'KeudeKu mendigitalisasi kuliner warkop legendaris Aceh. Kami menggabungkan cita rasa otentik dengan efisiensi sistem kasir pintar.',
    brandLogo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=150',
    brandTagline: 'Cita Rasa Tradisional, Sentuhan Digital Modern',
    brandPhone: '+62 811-6800-2026',
    brandInstagram: '@keudeku.id',
    themeColor: 'amber' 
  });

  const [customerForm, setCustomerForm] = useState({ name: '', phone: '', table: '', notes: '' });
  const [userStats, setUserStats] = useState({ id: '', name: '', phone: '', level: 'New Visitor', exp: 0, points: 0, table: '08' });
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('Semua');
  const [currentCustomerOrderId, setCurrentCustomerOrderId] = useState(null);
  
  // Voucher Redeeming System
  const [customerClaimedVouchers, setCustomerClaimedVouchers] = useState([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState('');
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  // Feedback Hub
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, menuId: 1, menuName: 'Sanger Espresso Double', customerName: 'Ahmad Gayo', rating: 5, comment: 'Sanger terenak di Banda Aceh!', isAnonymous: false, date: '14.35' }
  ]);
  const [ratedItems, setRatedItems] = useState({});
  const [ratingForm, setRatingForm] = useState({ rating: 5, comment: '', isAnonymous: false, activeItemKey: null });

  // Admin and Staff Navigation
  const [adminTab, setAdminTab] = useState('dashboard');
  const [reportTimeRange, setReportTimeRange] = useState('Hari Ini');
  const [cashierTab, setCashierTab] = useState('unpaid');
  const [kitchenTab, setKitchenTab] = useState('active');
  const [cashierSearch, setCashierSearch] = useState('');
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Interactive Admin Modals
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuForm, setMenuForm] = useState({ id: '', name: '', category: 'Coffee', price: '', badge: '', points: '10', desc: '', image: '', status: 'Active' });

  const [isAddingVoucher, setIsAddingVoucher] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [voucherForm, setVoucherForm] = useState({ id: '', title: '', code: '', pointsCost: '', type: 'percent', discountValue: '', desc: '', status: 'Active' });

  const [isAddingTable, setIsAddingTable] = useState(false);
  const [newTableId, setNewTableId] = useState('');
  const [newTableCapacity, setNewTableCapacity] = useState('4');

  const [paymentModal, setPaymentModal] = useState({ isOpen: false, orderId: null, total: 0, method: '' });
  const [cashGiven, setCashGiven] = useState('');
  const [manualOrderForm, setManualOrderForm] = useState({ name: '', phone: '', table: '', notes: '', items: [] });
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  // Member Management Actions
  const [editingMember, setEditingMember] = useState(null);
  const [memberPointsDelta, setMemberPointsDelta] = useState('');

  // Security Credentials
  const [authenticatedRoles, setAuthenticatedRoles] = useState({ kitchen: false, cashier: false, admin: false });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
    script.async = true;
    script.onload = () => setJsQRAvailable(true);
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Notifications for Kitchen
  const [prevPendingCount, setPrevPendingCount] = useState(0);
  useEffect(() => {
    const pendingCount = globalOrders.filter(o => o.status === 'pending').length;
    if (pendingCount > prevPendingCount) {
      showToast("🔔 Pesanan Baru Masuk di Dapur!");
    }
    setPrevPendingCount(pendingCount);
  }, [globalOrders]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  const getThemeClasses = () => {
    switch(settings.themeColor) {
      case 'emerald':
        return {
          primaryBg: 'bg-[#022c22]',
          accentColor: 'text-[#10b981]',
          accentBg: 'bg-[#10b981]',
          accentBorder: 'border-[#10b981]',
          accentText: 'text-[#10b981]',
          gradientFrom: 'from-[#064e3b]',
          gradientTo: 'to-[#022c22]'
        };
      case 'rose':
        return {
          primaryBg: 'bg-[#4c0519]',
          accentColor: 'text-[#f43f5e]',
          accentBg: 'bg-[#f43f5e]',
          accentBorder: 'border-[#f43f5e]',
          accentText: 'text-[#f43f5e]',
          gradientFrom: 'from-[#881337]',
          gradientTo: 'to-[#4c0519]'
        };
      case 'indigo':
        return {
          primaryBg: 'bg-[#1e1b4b]',
          accentColor: 'text-[#6366f1]',
          accentBg: 'bg-[#6366f1]',
          accentBorder: 'border-[#6366f1]',
          accentText: 'text-[#6366f1]',
          gradientFrom: 'from-[#312e81]',
          gradientTo: 'to-[#1e1b4b]'
        };
      case 'violet':
        return {
          primaryBg: 'bg-[#2e1065]',
          accentColor: 'text-[#8b5cf6]',
          accentBg: 'bg-[#8b5cf6]',
          accentBorder: 'border-[#8b5cf6]',
          accentText: 'text-[#8b5cf6]',
          gradientFrom: 'from-[#4c1d95]',
          gradientTo: 'to-[#2e1065]'
        };
      case 'amber':
      default:
        return {
          primaryBg: 'bg-[#1E1917]',
          accentColor: 'text-[#D4A24C]',
          accentBg: 'bg-[#D4A24C]',
          accentBorder: 'border-[#D4A24C]',
          accentText: 'text-[#D4A24C]',
          gradientFrom: 'from-[#2C2523]',
          gradientTo: 'to-[#120E0D]'
        };
    }
  };

  const theme = getThemeClasses();

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      return existing ? prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...item, qty: 1 }];
    });
    showToast(`Ditambahkan: ${item.name}`);
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (!existing) return prev;
      return existing.qty === 1 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const getEarnedPoints = () => cart.reduce((sum, item) => sum + ((item.points || 10) * item.qty), 0);

  const getVoucherDiscountAmount = () => {
    if (!selectedVoucherId) return 0;
    const activeVoucher = vouchers.find(v => v.id.toString() === selectedVoucherId.toString());
    if (!activeVoucher) return 0;

    const subtotal = getCartTotal();
    if (activeVoucher.type === 'percent') {
      return (subtotal * activeVoucher.discountValue) / 100;
    } else if (activeVoucher.type === 'fixed') {
      return Math.min(activeVoucher.discountValue, subtotal);
    } else if (activeVoucher.type === 'free_item') {
      return Math.min(activeVoucher.discountValue, subtotal);
    }
    return 0;
  };

  const getCartTotalWithTax = () => {
    const subtotal = getCartTotal();
    const discount = getVoucherDiscountAmount();
    const netTotal = Math.max(0, subtotal - discount);
    return netTotal * (1 + settings.taxPercentage / 100);
  };

  const startRealCameraScanner = async () => {
    setRealCameraScanActive(true);
    try {
      const constraints = { video: { facingMode: 'environment' } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.play();
        animationFrameRef.current = requestAnimationFrame(scanQRCodeTick);
      }
    } catch (err) {
      console.error("Gagal mendapatkan akses kamera: ", err);
      showToast("⚠️ Tidak bisa mengakses kamera fisik. Menggunakan Simulator!");
      setRealCameraScanActive(false);
      startScanningSimulator();
    }
  };

  const stopRealCameraScanner = () => {
    setRealCameraScanActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.12);
    } catch(e) {
      console.log("AudioContext restricted or muted.");
    }
  };

  const scanQRCodeTick = () => {
    if (!realCameraScanActive || !videoRef.current) return;
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (window.jsQR) {
          const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (code) {
            playBeep();
            stopRealCameraScanner();
            
            let decodedTable = "08";
            try {
              const url = new URL(code.data);
              const tableParam = url.searchParams.get("table");
              if (tableParam) decodedTable = tableParam;
            } catch(e) {
              if (code.data && code.data.length < 5) decodedTable = code.data;
            }

            setCustomerForm(prev => ({ ...prev, table: decodedTable }));
            showToast(`🎉 QR Code Meja M-${decodedTable} Terdeteksi!`);
            handleConnectTableDirectly(decodedTable);
            return;
          }
        }
      }
    }
    animationFrameRef.current = requestAnimationFrame(scanQRCodeTick);
  };

  const handleConnectTableDirectly = (targetTable) => {
    const matchedCustomer = customers.find(c => c.phone === customerForm.phone);
    if (matchedCustomer) {
      setUserStats({
        id: matchedCustomer.id, name: matchedCustomer.name, phone: matchedCustomer.phone,
        level: matchedCustomer.level, exp: matchedCustomer.exp, points: matchedCustomer.points, table: targetTable
      });
      showToast(`Meja M-${targetTable} Terhubung! Selamat datang, ${matchedCustomer.name}!`);
    } else {
      const randomId = `KPQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newCust = { id: randomId, name: customerForm.name || 'Pelanggan Baru', phone: customerForm.phone || '0812345678', level: 'New Visitor', exp: 0, points: 10, spend: 0 };
      setCustomers(prev => [...prev, newCust]);
      setUserStats({ ...newCust, table: targetTable });
      showToast(`Meja M-${targetTable} Terhubung!`);
    }
    setCustomerView('menu');
  };

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerProgress, setScannerProgress] = useState(0);

  const startScanningSimulator = () => {
    setIsScannerOpen(true);
    setScannerProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScannerProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScannerOpen(false);
          const pickedTable = '03'; 
          setCustomerForm(prev => ({ ...prev, table: pickedTable }));
          playBeep();
          handleConnectTableDirectly(pickedTable);
        }, 800);
      }
    }, 200);
  };

  const handleScanQR = (e) => {
    e.preventDefault();
    if (!customerForm.name.trim() || !customerForm.phone.trim()) {
      showToast("Silakan isi nama dan nomor WhatsApp!");
      return;
    }
    const targetTable = customerForm.table || '08';
    handleConnectTableDirectly(targetTable);
  };

  const handleCheckout = (paymentMethodForDP = '') => {
    const totalWithTax = getCartTotalWithTax();
    const earnedPoints = getEarnedPoints();
    const orderId = `${orderMode === 'reservation' ? 'RES' : 'ORD'}-${Math.floor(100000 + Math.random() * 900000)}`;
    const discount = getVoucherDiscountAmount();

    const newOrder = {
      orderId, type: orderMode, tableName: userStats.table || '08', customerName: userStats.name, customerPhone: userStats.phone,
      items: [...cart], total: totalWithTax, discountAmount: discount, pointsEarned: earnedPoints, notes: customerForm.notes,
      date: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), timestamp: Date.now(),
      status: orderMode === 'reservation' ? 'pending_reservation' : 'pending',
      paymentStatus: orderMode === 'reservation' ? 'dp_unpaid' : 'unpaid',
      paymentMethod: paymentMethodForDP, dpAmount: orderMode === 'reservation' ? totalWithTax * 0.5 : 0
    };

    setGlobalOrders(prev => [newOrder, ...prev]);
    setCurrentCustomerOrderId(orderId);

    if (selectedVoucherId) {
      const activeVoucher = vouchers.find(v => v.id.toString() === selectedVoucherId.toString());
      if (activeVoucher) {
        setUserStats(prev => ({ ...prev, points: Math.max(0, prev.points - activeVoucher.pointsCost) }));
        setCustomers(prev => prev.map(c => c.phone === userStats.phone ? { ...c, points: Math.max(0, c.points - activeVoucher.pointsCost) } : c));
      }
    }

    if (orderMode === 'reservation') {
      setTimeout(() => {
        setGlobalOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, paymentStatus: 'dp_paid', status: 'reserved' } : o));
        setTables(prev => prev.map(t => t.id === userStats.table ? { ...t, status: 'reserved' } : t));
        showToast("DP Berhasil Dibayar! Meja telah di-reservasi.");
      }, 1500);
    } else {
      setTables(prev => prev.map(t => t.id === userStats.table ? { ...t, status: 'occupied' } : t));
      const nextPoints = userStats.points + earnedPoints;
      setUserStats(prev => ({ ...prev, points: nextPoints }));
      setCustomers(prev => prev.map(c => {
        if (c.phone === userStats.phone) {
          const nextExp = c.exp + settings.baseExpGain;
          const leveledUp = nextExp >= 100;
          const updatedLevel = leveledUp ? (c.level === 'New Visitor' ? 'Regular Customer' : c.level === 'Regular Customer' ? 'Coffee Lover' : c.level === 'Coffee Lover' ? 'Warkop Enthusiast' : 'Aceh Legend') : c.level;
          return { ...c, points: c.points + earnedPoints, exp: leveledUp ? (nextExp - 100) : nextExp, level: updatedLevel, spend: c.spend + totalWithTax };
        }
        return c;
      }));
      showToast("Pesanan dikirim ke Dapur!");
    }

    setCart([]);
    setSelectedVoucherId('');
    setCustomerView('status');
  };

  const giftMemberPoints = (memberId) => {
    const pointsDelta = parseInt(memberPointsDelta);
    if (isNaN(pointsDelta)) {
      showToast("Masukkan angka poin yang valid!");
      return;
    }
    setCustomers(prev => prev.map(m => {
      if (m.id === memberId) {
        const nextPoints = Math.max(0, m.points + pointsDelta);
        showToast(`Berhasil merubah poin ${m.name} sebanyak ${pointsDelta}`);
        return { ...m, points: nextPoints };
      }
      return m;
    }));
    setEditingMember(null);
    setMemberPointsDelta('');
  };

  const handleCashierPayment = (e) => {
    e.preventDefault();
    const { orderId, total, method } = paymentModal;
    
    if (method === 'Cash') {
      const given = Number(cashGiven);
      if (given < total) { 
        showToast("Uang tunai tidak cukup!"); 
        return; 
      }
      showToast(`Lunas! Kembalian: Rp ${(given - total).toLocaleString('id-ID')}`);
    } else {
      showToast(`Pesanan ${orderId} Lunas dibayar dengan ${method}!`);
    }

    setGlobalOrders(prev => prev.map(order => {
      if (order.orderId === orderId) {
        setTables(tbls => tbls.map(t => t.id === order.tableName ? { ...t, status: 'available' } : t));
        const updated = { ...order, paymentStatus: 'paid', paymentMethod: method, status: 'completed' };
        setActiveReceipt(updated);
        return updated;
      }
      return order;
    }));
    
    setPaymentModal({ isOpen: false, orderId: null, total: 0, method: '' });
    setCashGiven('');
  };

  const confirmArrival = (orderId, tableId) => {
    setGlobalOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: 'pending', paymentStatus: 'dp_paid' } : o));
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: 'occupied' } : t));
    showToast("Pelanggan tiba! Sisa tagihan akan dilunasi nanti.");
  };

  const handleManualOrderSubmit = (e) => {
    e.preventDefault();
    if (manualOrderForm.items.length === 0) { 
      showToast("Pilih minimal 1 menu!"); 
      return; 
    }
    
    const subtotal = manualOrderForm.items.reduce((s, i) => s + (i.price * i.qty), 0);
    const total = subtotal * (1 + settings.taxPercentage / 100);
    const orderId = `MNL-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newOrder = {
      orderId, type: 'dine_in', tableName: manualOrderForm.table, customerName: manualOrderForm.name, customerPhone: manualOrderForm.phone,
      items: manualOrderForm.items, total, discountAmount: 0, pointsEarned: Math.floor(total / 1000), notes: manualOrderForm.notes,
      status: 'pending', paymentStatus: 'unpaid', paymentMethod: '', date: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), timestamp: Date.now()
    };
    
    setGlobalOrders(prev => [newOrder, ...prev]);
    setTables(prev => prev.map(t => t.id === manualOrderForm.table ? { ...t, status: 'occupied' } : t));
    showToast("Pesanan Manual Berhasil Dibuat & Dikirim ke Dapur!");
    setManualOrderForm({ name: '', phone: '', table: '', notes: '', items: [] });
  };

  const handleRoleLogin = (e) => {
    e.preventDefault();
    const { username, password } = loginForm;
    
    if (currentRole === 'kitchen') {
      if (username === 'kitchen' && password === '123') {
        setAuthenticatedRoles(p => ({ ...p, kitchen: true }));
        showToast("Sesi dapur aktif!");
        setLoginForm({ username: '', password: '' });
      } else {
        showToast("Kredensial dapur salah! (Demo: kitchen / 123)");
      }
    } else if (currentRole === 'cashier') {
      if (username === 'cashier' && password === '123') {
        setAuthenticatedRoles(p => ({ ...p, cashier: true }));
        showToast("Sesi kasir aktif!");
        setLoginForm({ username: '', password: '' });
      } else {
        showToast("Kredensial kasir salah! (Demo: cashier / 123)");
      }
    } else if (currentRole === 'admin') {
      if (username === 'admin' && password === '123') {
        setAuthenticatedRoles(p => ({ ...p, admin: true }));
        showToast("Sesi owner aktif!");
        setLoginForm({ username: '', password: '' });
      } else {
        showToast("Kredensial owner salah! (Demo: admin / 123)");
      }
    }
  };

  const handleRoleLogout = (role) => {
    setAuthenticatedRoles(p => ({ ...p, [role]: false }));
    showToast(`Berhasil keluar dari panel ${role}`);
  };

  const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast("Sandi WiFi berhasil disalin!");
  };

  const handleExportFinancialPDF = () => {
    const totalTransactions = globalOrders.filter(o => o.paymentStatus === 'paid');
    const totalRevenue = totalTransactions.reduce((sum, o) => sum + o.total, 0);
    
    const reportMultiplier = reportTimeRange === 'Hari Ini' ? 1.0 : reportTimeRange === '7 Hari' ? 5.2 : 22.4;
    const reportRevenue = Math.round(totalRevenue * reportMultiplier);
    const reportTax = Math.round(reportRevenue * (settings.taxPercentage / 100));
    const reportNet = reportRevenue - reportTax;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Laporan Keuangan - ${settings.shopName}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e1917; margin: 0; padding: 50px; line-height: 1.5; background: #fff; }
            .header-container { display: flex; justify-content: space-between; align-items: center; border-bottom: 4px double #1e1917; padding-bottom: 25px; margin-bottom: 35px; }
            .logo-area { display: flex; align-items: center; gap: 15px; }
            .logo-placeholder { width: 55px; height: 55px; background: #1e1917; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #D4A24C; font-weight: 900; font-size: 24px; border: 2px solid #D4A24C; }
            .title-area h1 { margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.5px; }
            .title-area p { margin: 5px 0 0 0; font-size: 13px; color: #555; }
            .meta-info { text-align: right; font-size: 13px; color: #444; }
            .meta-info strong { color: #1e1917; }
            .report-title-card { text-align: center; background: #fdf8f5; border: 2px solid #d4a24c; padding: 20px; border-radius: 14px; margin-bottom: 35px; }
            .report-title-card h2 { margin: 0; font-size: 18px; font-weight: 800; color: #1e1917; text-transform: uppercase; letter-spacing: 1px; }
            .report-title-card p { margin: 5px 0 0 0; font-size: 12px; color: #666; font-weight: 500; }
            .stats-grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 20px; margin-bottom: 35px; }
            .stat-card { border: 1px solid #e1dbd6; padding: 18px; border-radius: 12px; background: #faf8f5; }
            .stat-card .label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #7c7267; letter-spacing: 0.5px; }
            .stat-card .val { font-size: 20px; font-weight: 900; color: #1e1917; margin-top: 5px; }
            .stat-card .desc { font-size: 11px; color: #666; margin-top: 3px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 45px; font-size: 13px; }
            th { background: #1e1917; color: #fff; text-align: left; padding: 12px; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
            td { padding: 12px; border-bottom: 1px solid #e1dbd6; color: #333; }
            tr:nth-child(even) td { background: #fcfbfa; }
            .text-right { text-align: right; }
            .grand-total-row td { font-weight: bold; font-size: 14px; border-top: 2px solid #1e1917; border-bottom: 2px solid #1e1917; background: #fff8f4 !important; }
            .footer-signatures { display: flex; justify-content: space-between; margin-top: 90px; font-size: 13px; }
            .signature-box { width: 220px; text-align: center; }
            .signature-line { border-bottom: 1px solid #1e1917; margin-top: 65px; margin-bottom: 5px; }
            .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 100px; color: rgba(30, 25, 23, 0.03); font-weight: 900; white-space: nowrap; pointer-events: none; z-index: -1000; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="watermark">KEUDEKU SAAS</div>
          <div class="header-container">
            <div class="logo-area">
              <div class="logo-placeholder">K</div>
              <div class="title-area">
                <h1>${settings.shopName}</h1>
                <p>${settings.address}</p>
              </div>
            </div>
            <div class="meta-info">
              <p>Tanggal Cetak: <strong>${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')}</strong></p>
              <p>Metrik Platform: <strong>SaaS Fin-Ops</strong></p>
            </div>
          </div>

          <div class="report-title-card">
            <h2>Laporan Neraca Ringkasan Keuangan</h2>
            <p>Rentang Laporan: ${reportTimeRange} (Pengali Multiplier: ${reportMultiplier}x)</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="label">Omset Kotor</div>
              <div class="val">Rp ${reportRevenue.toLocaleString('id-ID')}</div>
              <div class="desc">Akumulasi total tagihan kotor</div>
            </div>
            <div class="stat-card">
              <div class="label">Pajak Terkumpul (${settings.taxPercentage}%)</div>
              <div class="val">Rp ${reportTax.toLocaleString('id-ID')}</div>
              <div class="desc">Dana titipan pajak terkumpul</div>
            </div>
            <div class="stat-card">
              <div class="label">Omset Bersih (Net)</div>
              <div class="val" style="color: #2D6A4F;">Rp ${reportNet.toLocaleString('id-ID')}</div>
              <div class="desc">Pendapatan bersih setelah pajak</div>
            </div>
          </div>

          <h3 style="font-size: 15px; font-weight: bold; border-bottom: 2px solid #e1dbd6; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Daftar Transaksi Dasar</h3>
          <table>
            <thead>
              <tr>
                <th>ID Nota</th>
                <th>Meja</th>
                <th>Nama Pelanggan</th>
                <th>Metode Bayar</th>
                <th>Waktu</th>
                <th class="text-right">Nominal</th>
              </tr>
            </thead>
            <tbody>
              ${totalTransactions.map(t => `
                <tr>
                  <td>${t.orderId}</td>
                  <td>M-${t.tableName}</td>
                  <td>${t.customerName}</td>
                  <td>${t.paymentMethod || 'Tunai'}</td>
                  <td>${t.date}</td>
                  <td class="text-right">Rp ${t.total.toLocaleString('id-ID')}</td>
                </tr>
              `).join('')}
              <tr class="grand-total-row">
                <td colspan="5" class="text-right">Total Transaksi Hari Ini:</td>
                <td class="text-right">Rp ${totalRevenue.toLocaleString('id-ID')}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer-signatures">
            <div class="signature-box">
              <p>Disiapkan Oleh,</p>
              <div class="signature-line"></div>
              <p>Sistem POS KeudeKu</p>
            </div>
            <div class="signature-box">
              <p>Disahkan Oleh Owner,</p>
              <div class="signature-line"></div>
              <p>${settings.shopName}</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const renderIllustration = (type) => {
    switch (type) {
      case 'qr-scan':
        return (
          <svg className="w-full h-40 max-w-xs mx-auto" viewBox="0 0 200 200" fill="none">
            <rect x="30" y="30" width="140" height="140" rx="20" fill="#2C2523" stroke="#D4A24C" strokeWidth="3" />
            <rect x="50" y="50" width="35" height="35" rx="6" fill="#1A1615" stroke="#D4A24C" strokeWidth="2" />
            <rect x="115" y="50" width="35" height="35" rx="6" fill="#1A1615" stroke="#D4A24C" strokeWidth="2" />
            <rect x="50" y="115" width="35" height="35" rx="6" fill="#1A1615" stroke="#D4A24C" strokeWidth="2" />
            <rect x="62" y="62" width="11" height="11" fill="#D4A24C" />
            <rect x="127" y="62" width="11" height="11" fill="#D4A24C" />
            <rect x="62" y="127" width="11" height="11" fill="#D4A24C" />
            <line x1="100" y1="50" x2="100" y2="150" stroke="#D4A24C" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#EF4444" strokeWidth="3" className="animate-pulse" />
          </svg>
        );
      case 'gamifikasi':
        return (
          <svg className="w-full h-40 max-w-xs mx-auto" viewBox="0 0 200 200" fill="none">
            <line x1="30" y1="150" x2="170" y2="50" stroke="#4B5563" strokeWidth="4" />
            <circle cx="30" cy="150" r="16" fill="#1E1B4B" stroke="#D4A24C" strokeWidth="3" />
            <circle cx="100" cy="100" r="16" fill="#1E1B4B" stroke="#D4A24C" strokeWidth="3" />
            <circle cx="170" cy="50" r="16" fill="#D4A24C" stroke="#1A1615" strokeWidth="3" />
            <path d="M25 150 L170 50" stroke="#D4A24C" strokeWidth="4" strokeDasharray="8 8" />
            <text x="30" y="154" fill="#D4A24C" fontSize="10" fontWeight="bold" textAnchor="middle">LV 1</text>
            <text x="100" y="104" fill="#D4A24C" fontSize="10" fontWeight="bold" textAnchor="middle">LV 3</text>
            <text x="170" y="54" fill="#1A1615" fontSize="10" fontWeight="bold" textAnchor="middle">★</text>
            <rect x="65" y="12" width="70" height="25" rx="5" fill="#374151" />
            <text x="100" y="28" fill="#F3F4F6" fontSize="9" textAnchor="middle">Aceh Legend Tier</text>
          </svg>
        );
      case 'multi-role':
        return (
          <svg className="w-full h-40 max-w-xs mx-auto" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="30" fill="#2C2523" stroke="#D4A24C" strokeWidth="2" />
            <text x="100" y="104" fill="#D4A24C" fontSize="9" fontWeight="black" textAnchor="middle">SAAS HUB</text>
            
            <circle cx="40" cy="50" r="15" fill="#1A1615" stroke="#9CA3AF" strokeWidth="1" />
            <text x="40" y="53" fill="#FFF" fontSize="8" textAnchor="middle">Customer</text>

            <circle cx="160" cy="50" r="15" fill="#1A1615" stroke="#9CA3AF" strokeWidth="1" />
            <text x="160" y="53" fill="#FFF" fontSize="8" textAnchor="middle">Dapur</text>

            <circle cx="40" cy="150" r="15" fill="#1A1615" stroke="#9CA3AF" strokeWidth="1" />
            <text x="40" y="153" fill="#FFF" fontSize="8" textAnchor="middle">Kasir</text>

            <circle cx="160" cy="150" r="15" fill="#1A1615" stroke="#9CA3AF" strokeWidth="1" />
            <text x="160" y="153" fill="#FFF" fontSize="8" textAnchor="middle">Owner</text>

            <path d="M55 57 L80 80" stroke="#D4A24C" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M145 57 L120 80" stroke="#D4A24C" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M55 143 L80 120" stroke="#D4A24C" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M145 143 L120 120" stroke="#D4A24C" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderLandingPage = () => (
    <div className={`min-h-[calc(100vh-60px)] bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} text-white animate-in fade-in duration-500 pb-16`}>
      <header className="text-center p-10 md:p-20 relative overflow-hidden border-b border-white/10 shadow-2xl">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D4A24C 2.5px, transparent 2.5px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#D4A24C]/15 border border-[#D4A24C]/40 px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={14} className={theme.accentColor} />
            <span className={`text-[10px] uppercase tracking-widest font-black ${theme.accentColor}`}>Aceh Digital Food Enterprise Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            KeudeKu <span className={theme.accentColor}>SaaS Platform</span>
          </h1>
          <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
            Mendigitalisasi ekosistem F&B Aceh. Menghubungkan cita rasa kuliner warkop legendaris dengan otomasi dapur, kasir pintar, loyalty points, dan dasbor finansial dalam satu aplikasi.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
            <button onClick={() => setCustomerView('tenant_profile')} className={`bg-[#D4A24C] hover:bg-[#c59443] text-[#1A1615] px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-2 transition-transform transform hover:scale-105`}>
              Cari Menu Sekarang <ArrowRight size={16} />
            </button>
            <button onClick={() => { setCurrentRole('admin'); setAdminTab('dashboard'); }} className="bg-white/10 hover:bg-white/20 border border-white/10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-2">
              <Shield size={16} className={theme.accentColor} /> Demo Owner View
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto p-6 md:p-12 space-y-20">
        <div className="text-center space-y-4">
          <span className={`${theme.accentColor} text-xs font-black tracking-widest uppercase`}>Platform Core Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-black">Fitur Utama Ekosistem Digital KeudeKu</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">Dirancang khusus untuk menghidupkan tradisi kuliner lokal ke era digital.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1A1615] border border-gray-800 p-8 rounded-3xl space-y-4 shadow-lg hover:border-[#D4A24C]/40 transition-colors text-center">
            <div className="mx-auto mb-4">{renderIllustration('qr-scan')}</div>
            <h3 className="text-xl font-black flex items-center justify-center gap-2"><QrCode size={20} className={theme.accentColor} /> QR Menu Dine-In</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pelanggan memindai QR code unik di atas meja makan secara langsung menggunakan kamera smartphone. Menu premium langsung tersaji secara web-native instan tanpa unduh aplikasi.
            </p>
          </div>

          <div className="bg-[#1A1615] border border-gray-800 p-8 rounded-3xl space-y-4 shadow-lg hover:border-[#D4A24C]/40 transition-colors text-center">
            <div className="mx-auto mb-4">{renderIllustration('gamifikasi')}</div>
            <h3 className="text-xl font-black flex items-center justify-center gap-2"><Trophy size={20} className={theme.accentColor} /> Tier Gamifikasi & Loyalty</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Setiap transaksi melahirkan poin dan EXP. Pelanggan dapat berproses dari level <strong className="text-white">New Visitor</strong>, <strong className="text-white">Coffee Lover</strong>, hingga tingkat tertinggi <strong className="text-[#D4A24C]">Aceh Legend</strong> dengan benefit voucher khusus.
            </p>
          </div>

          <div className="bg-[#1A1615] border border-gray-800 p-8 rounded-3xl space-y-4 shadow-lg hover:border-[#D4A24C]/40 transition-colors text-center">
            <div className="mx-auto mb-4">{renderIllustration('multi-role')}</div>
            <h3 className="text-xl font-black flex items-center justify-center gap-2"><Layers size={20} className={theme.accentColor} /> Multi-Role Sync</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Hub sinkronisasi data seketika. Mengoordinasikan input pesanan dari pelanggan, pemrosesan juru masak di dapur, validasi pembayaran di mesin kasir, hingga pelaporan owner secara real-time.
            </p>
          </div>
        </div>

        <div className="bg-[#1A1615] rounded-3xl p-8 md:p-12 border border-gray-800 space-y-12">
          <div className="text-center space-y-3">
            <span className={`${theme.accentColor} text-xs font-black tracking-widest uppercase`}>Simulated Workflows</span>
            <h2 className="text-3xl font-black text-white">Bagaimana Alur Kerja Sistem KeudeKu?</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
            <div className="space-y-6">
              <h3 className={`text-xl font-black ${theme.accentColor} flex items-center gap-2 pb-2 border-b border-gray-800`}>
                <Store size={20} /> 1. Alur Makan Di Tempat (Scan Meja)
              </h3>
              <ol className="space-y-4 text-sm text-gray-300 font-medium">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#D4A24C] text-[#1A1615] font-black flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-base">Pindai QR Kode Asli</h4>
                    <p className="text-gray-400 text-xs mt-1">Gunakan fitur kamera live web pada perangkat untuk memindai QR code meja fisik.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#D4A24C] text-[#1A1615] font-black flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-base">Registrasi & Pesan Menu</h4>
                    <p className="text-gray-400 text-xs mt-1">Lengkapi nama & nomor WhatsApp lalu pilih sanger, sate matang, atau mie aceh premium.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#D4A24C] text-[#1A1615] font-black flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-base">Dapur Memproses Instan</h4>
                    <p className="text-gray-400 text-xs mt-1">Dapur menerima pesanan di monitor memasak dan mulai mengolah sanger espresso.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black text-rose-400 flex items-center gap-2 pb-2 border-b border-gray-800">
                <Calendar size={20} /> 2. Alur Reservasi Online
              </h3>
              <ol className="space-y-4 text-sm text-gray-300 font-medium">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-rose-400 text-[#1A1615] font-black flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-base">Booking & Pre-Order</h4>
                    <p className="text-gray-400 text-xs mt-1">Amankan slot meja dari denah visual, lalu tentukan pre-order hidangan Anda.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-rose-400 text-[#1A1615] font-black flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-base">Uang Muka DP 50%</h4>
                    <p className="text-gray-400 text-xs mt-1">Lakukan pembayaran deposit 50% via QRIS atau Transfer Bank untuk verifikasi pesanan.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-rose-400 text-[#1A1615] font-black flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-base">Kedatangan Pelanggan</h4>
                    <p className="text-gray-400 text-xs mt-1">Kasir menekan tombol konfirmasi kehadiran dan pesanan langsung dimasak.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-black text-center flex items-center justify-center gap-3">
            <UtensilsCrossed className={theme.accentColor} /> Mulai Menjelajah Tenant Kuliner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {INITIAL_TENANTS.map(tenant => (
              <div key={tenant.id} onClick={() => setCustomerView('tenant_profile')} className="bg-[#1A1615] rounded-3xl border border-gray-800 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(212,162,76,0.15)] hover:border-[#D4A24C]/40 cursor-pointer transition-all duration-300 group">
                <div className="h-56 overflow-hidden relative">
                  <img src={tenant.image} alt={tenant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615] to-transparent opacity-80"></div>
                  <span className="absolute top-4 right-4 bg-[#1A1615]/80 backdrop-blur border border-gray-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Star size={14} fill="#D4A24C" className="text-[#D4A24C]" /> {tenant.rating}
                  </span>
                </div>
                <div className="p-6 -mt-8 relative z-10">
                  <span className={`text-[10px] uppercase font-black tracking-widest ${theme.accentColor} bg-[#2C2523] px-3 py-1 rounded-lg border border-[#C96A3D]/20 shadow-sm`}>{tenant.category}</span>
                  <h3 className="text-2xl font-black text-white mt-4">{tenant.name}</h3>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">{tenant.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderTenantProfile = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1917] to-[#120E0D] text-white animate-in slide-in-from-right-8">
      <header className="h-72 relative">
        <img src={INITIAL_TENANTS[0].image} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120E0D] via-[#1E1917]/50 to-transparent"></div>
        <button onClick={() => setCustomerView('landing_tenant')} className="absolute top-6 left-6 bg-[#1A1615]/50 hover:bg-[#1A1615] border border-gray-600 backdrop-blur p-2 rounded-full text-white transition-all"><ChevronLeft /></button>
        <div className="absolute bottom-6 left-6 text-white w-full max-w-xl pr-6">
          <h1 className="text-4xl font-black text-[#D4A24C] drop-shadow-lg">{settings.shopName}</h1>
          <p className="text-gray-300 text-sm mt-2 flex items-center gap-2"><MapPin size={16} className="text-[#C96A3D]"/> {settings.address}</p>
        </div>
      </header>
      <main className="p-6 max-w-2xl mx-auto space-y-6 mt-4 relative z-10 text-left">
        <div className="bg-[#1A1615] border border-gray-800 rounded-3xl p-6 text-center shadow-lg">
          <p className="text-sm text-gray-400 font-medium">Selamat datang di profil <strong className="text-white">{settings.shopName}</strong>. Silakan pilih layanan pemesanan di bawah ini.</p>
        </div>
        <button 
          onClick={() => { setOrderMode('dine_in'); setCustomerForm({...customerForm, notes: ''}); setCustomerView('scan_qr'); }}
          className="w-full bg-gradient-to-r from-[#D4A24C] to-[#C96A3D] text-[#1A1615] p-6 rounded-3xl flex items-center justify-between shadow-xl hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center gap-5 text-left">
            <div className="bg-[#1A1615]/20 p-4 rounded-2xl backdrop-blur-sm"><QrCode size={32} className="text-[#1A1615]" /></div>
            <div>
              <h3 className="font-black text-xl text-[#1A1615]">Makan di Tempat (Scan QR)</h3>
              <p className="text-sm text-[#1A1615]/80 font-semibold mt-1">Pindai QR meja, pesan langsung.</p>
            </div>
          </div>
          <ArrowRight className="text-[#1A1615]" size={28} />
        </button>
        <button 
          onClick={() => { setOrderMode('reservation'); setCustomerForm({...customerForm, notes: ''}); setCustomerView('reservation_table'); }}
          className="w-full bg-[#1A1615] border border-[#D4A24C]/40 text-white p-6 rounded-3xl flex items-center justify-between shadow-lg hover:scale-[1.02] transition-transform group"
        >
          <div className="flex items-center gap-5 text-left">
            <div className="bg-[#2C2523] group-hover:bg-[#3d3330] p-4 rounded-2xl text-[#D4A24C] transition-colors"><Calendar size={32} /></div>
            <div>
              <h3 className="font-black text-xl text-[#D4A24C]">Reservasi Meja (Booking)</h3>
              <p className="text-sm text-gray-400 mt-1">Pilih meja & pre-order menu (Wajib DP 50%).</p>
            </div>
          </div>
          <ArrowRight className="text-[#D4A24C]" size={28} />
        </button>
      </main>
    </div>
  );

  const renderScanQR = () => (
    <div className="min-h-[calc(100vh-60px)] flex flex-col justify-center items-center p-6 bg-gradient-to-b from-[#1E1917] to-[#120E0D] text-white animate-in zoom-in-95 duration-500">
      <div className="w-full max-w-md bg-[#1A1615] p-8 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 p-4 opacity-5"><QrCode size={100} /></div>
        <button onClick={() => setCustomerView('tenant_profile')} className="mb-6 text-gray-400 hover:text-white flex items-center gap-1 text-sm transition-colors"><ChevronLeft size={16}/> Kembali</button>
        
        <div className="text-center mb-6 relative z-10">
          <div className="w-16 h-16 bg-[#2C2523] border border-[#D4A24C]/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <QrCode size={32} className="text-[#D4A24C] animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-[#D4A24C]">Registrasi Scan QR Meja</h2>
          <p className="text-xs text-gray-400 mt-1">Gunakan Kamera Smartphone Anda untuk memindai QR code asli di atas meja atau input secara manual di bawah.</p>
        </div>

        {realCameraScanActive ? (
          <div className="mb-6 space-y-3">
            <div className="relative w-full h-56 bg-black rounded-2xl overflow-hidden border border-gray-700 shadow-inner flex items-center justify-center">
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute w-40 h-40 border-2 border-dashed border-[#D4A24C]/60 rounded-xl flex items-center justify-center pointer-events-none">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-[#D4A24C]"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-[#D4A24C]"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-[#D4A24C]"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-[#D4A24C]"></div>
              </div>
              <div className="absolute w-full h-0.5 bg-red-500 top-1/2 left-0 animate-pulse shadow-md"></div>
              <span className="absolute bottom-2 text-[10px] bg-black/80 px-3 py-1 rounded text-red-400 font-bold tracking-wide">KAMERA LIVE AKTIF</span>
            </div>
            <button 
              type="button" 
              onClick={stopRealCameraScanner}
              className="w-full bg-red-900/30 border border-red-700/50 text-red-400 hover:bg-red-900/50 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all"
            >
              Matikan Kamera
            </button>
          </div>
        ) : (
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onClick={startRealCameraScanner}
              className="bg-[#D4A24C]/25 border border-[#D4A24C]/50 text-[#D4A24C] hover:bg-[#D4A24C]/40 p-4 rounded-2xl font-black text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all shadow-md"
            >
              <Camera size={24} className="animate-bounce" /> Pindai QR Asli
            </button>
            <button 
              type="button" 
              onClick={startScanningSimulator}
              className="bg-[#2C2523] border border-gray-800 text-gray-300 hover:bg-[#3d3330] p-4 rounded-2xl font-black text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all shadow-md"
            >
              <RefreshCw size={24} /> Simulator Demo
            </button>
          </div>
        )}

        <form onSubmit={handleScanQR} className="space-y-4 relative z-10">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Nama Lengkap</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-3.5 text-gray-500" />
              <input type="text" required value={customerForm.name} onChange={e => setCustomerForm({...customerForm, name: e.target.value})} className="w-full bg-[#2C2523] border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white outline-none focus:border-[#D4A24C] transition-all" placeholder="Tulis Nama Anda..." />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Nomor HP WhatsApp</label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-3.5 text-gray-500" />
              <input type="tel" required value={customerForm.phone} onChange={e => setCustomerForm({...customerForm, phone: e.target.value})} className="w-full bg-[#2C2523] border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white outline-none focus:border-[#D4A24C] transition-all" placeholder="08..." />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Nomor Meja Manual</label>
            <select value={customerForm.table} onChange={e => setCustomerForm({...customerForm, table: e.target.value})} className="w-full bg-[#2C2523] border border-gray-800 rounded-xl py-3.5 px-4 text-sm text-white outline-none focus:border-[#D4A24C] transition-all">
              <option value="">-- Pilih Meja --</option>
              {tables.map(t => <option key={t.id} value={t.id}>Meja M-{t.id} (Kapasitas: {t.capacity} Orang)</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-[#D4A24C] hover:bg-[#c59443] text-[#1A1615] py-4 rounded-xl text-sm font-black uppercase tracking-wider mt-6 shadow-[0_0_20px_rgba(212,162,76,0.3)] transition-all">
            Hubungkan Meja
          </button>
        </form>
      </div>

      {isScannerOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#1A1615] rounded-3xl border border-gray-800 max-w-sm w-full p-6 text-center space-y-6 relative overflow-hidden">
            <h3 className="font-black text-base text-[#D4A24C]">Simulator QR Scanner</h3>
            <div className="w-48 h-48 mx-auto border-2 border-[#D4A24C] rounded-2xl relative flex items-center justify-center bg-black/50">
              <QrCode size={80} className="text-[#D4A24C] opacity-80" />
              <div className="absolute w-full h-1 bg-red-500 animate-bounce top-1/2 left-0"></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-gray-400">
                <span>Memproses Kamera...</span>
                <span>{scannerProgress}%</span>
              </div>
              <div className="w-full bg-[#2C2523] h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#C96A3D] to-[#D4A24C] h-full" style={{ width: `${scannerProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderReservationTable = () => (
    <div className="min-h-screen bg-[#FDF8F5] pb-28 animate-in slide-in-from-right-4 text-left">
      <header className="bg-white p-4 md:p-6 sticky top-0 z-10 shadow-sm border-b flex items-center justify-center">
        <div className="w-full max-w-3xl flex items-center gap-4">
          <button onClick={() => setCustomerView('tenant_profile')} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><ChevronLeft size={20} /></button>
          <h1 className="font-black text-lg md:text-xl text-[#1A1615]">Pilih Meja Reservasi</h1>
        </div>
      </header>
      <main className="p-5 md:p-8 max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 flex items-center gap-2">
            <User size={16} className="text-[#C96A3D]" /> Data Diri Pemesan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" required value={customerForm.name} onChange={e => setCustomerForm({...customerForm, name: e.target.value})} placeholder="Nama Pemesan" className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3.5 text-sm outline-none transition-all" />
            <input type="tel" required value={customerForm.phone} onChange={e => setCustomerForm({...customerForm, phone: e.target.value})} placeholder="Nomor WhatsApp" className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3.5 text-sm outline-none transition-all" />
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 flex items-center gap-2 mb-4">
            <LayoutDashboard size={16} className="text-[#2D6A4F]" /> Denah Kapasitas Meja
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tables.map(tbl => (
              <button 
                key={tbl.id} disabled={tbl.status !== 'available'}
                onClick={() => setCustomerForm({...customerForm, table: tbl.id})}
                className={`p-5 rounded-2xl border-2 text-left flex flex-col gap-3 transition-all relative overflow-hidden ${
                  customerForm.table === tbl.id ? 'border-[#D4A24C] bg-amber-50 shadow-md' : 
                  tbl.status === 'available' ? 'border-gray-200 bg-white hover:border-[#D4A24C]/50 shadow-sm' : 'border-gray-100 bg-gray-100 opacity-60 cursor-not-allowed'
                }`}
              >
                {customerForm.table === tbl.id && <div className="absolute top-0 right-0 bg-[#D4A24C] text-white p-1 rounded-bl-lg"><Check size={12}/></div>}
                <div className="flex justify-between items-center w-full">
                  <span className={`font-black text-xl ${customerForm.table === tbl.id ? 'text-[#D4A24C]' : 'text-[#1A1615]'}`}>M-{tbl.id}</span>
                  <span className="text-[10px] px-2.5 py-1 bg-gray-200 text-gray-600 rounded-md font-bold flex items-center gap-1"><Users size={10}/> {tbl.capacity}</span>
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${tbl.status==='available' ? 'text-[#2D6A4F]' : tbl.status==='reserved' ? 'text-[#C96A3D]' : 'text-gray-400'}`}>
                  {tbl.status === 'available' ? 'Tersedia' : tbl.status === 'reserved' ? 'Di-Reservasi' : 'Penuh'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex justify-center">
        <button 
          onClick={() => {
            if(!customerForm.name || !customerForm.phone || !customerForm.table) { showToast('Lengkapi data diri & pilih meja!'); return; }
            setUserStats({ id: `KPQ-${Math.floor(1000+Math.random()*9000)}`, name: customerForm.name, phone: customerForm.phone, level: 'New Visitor', exp: 0, points: 50, table: customerForm.table });
            setCustomerView('menu');
          }}
          className="w-full max-w-3xl bg-[#1A1615] text-[#D4A24C] py-4 rounded-xl text-sm font-black uppercase tracking-wider flex justify-center items-center gap-2 hover:bg-[#2C2523] transition-all"
        >
          Lanjut Pilih Menu <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  const renderMenu = () => {
    const categories = ['Semua', ...new Set(menuItems.map(item => item.category))];
    const filteredMenu = activeTab === 'Semua' 
      ? menuItems.filter(item => item.status === 'Active')
      : menuItems.filter(item => item.category === activeTab && item.status === 'Active');
    return (
      <div className="pb-32 min-h-screen bg-[#FDF8F5] animate-in fade-in duration-300 text-left">
        <header className="bg-gradient-to-b from-[#1E1917] to-[#120E0D] text-white rounded-b-[2.5rem] md:rounded-b-[4rem] p-6 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4A24C 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <button onClick={() => setCustomerView(orderMode === 'reservation' ? 'reservation_table' : 'scan_qr')} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-all"><ChevronLeft size={18} /></button>
                  <span className="text-gray-300 font-bold">|</span>
                  <p className="text-xs md:text-sm text-[#D4A24C] uppercase tracking-widest font-bold flex items-center gap-2">
                    {orderMode === 'reservation' ? 'Pre-Order Reservasi' : 'Dine-In Menu'}
                  </p>
                </div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">Halo, {userStats.name} 👋</h1>
                <p className="text-xs md:text-sm text-gray-400 font-mono mt-1 bg-[#2C2523] inline-block px-3 py-1 rounded-lg border border-white/5 self-start shadow-sm">
                  Meja M-{userStats.table} • {userStats.phone}
                </p>
              </div>
              
              <div className="flex flex-wrap md:flex-col gap-3 items-center md:items-end justify-between w-full md:w-auto">
                <div className="bg-gradient-to-br from-[#2C2523] to-[#120E0D] border border-[#D4A24C]/40 px-4 py-2 rounded-xl flex items-center md:flex-col shadow-lg gap-2 md:gap-0">
                  <Trophy size={18} className="text-[#D4A24C] md:mb-1 animate-bounce" />
                  <span className="text-[10px] font-bold text-[#D4A24C] uppercase tracking-widest">{userStats.level}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsVoucherModalOpen(true)} className="bg-[#D4A24C] hover:bg-[#c59443] text-[#1A1615] p-2.5 px-4 rounded-xl flex items-center gap-2 text-xs font-black transition-all shadow-md">
                    <Tag size={16} /> Tukar Voucher
                  </button>
                  {orderMode !== 'reservation' && (
                    <button onClick={() => setCustomerView('history')} className="bg-[#2C2523] hover:bg-[#3d3330] p-2.5 px-4 rounded-xl text-gray-300 hover:text-white border border-white/5 flex items-center gap-2 text-xs font-bold transition-all">
                      <History size={16} className="text-[#D4A24C]" /> Riwayat
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8 bg-[#2C2523] p-4 rounded-2xl border border-white/5 max-w-2xl">
              <div className="flex justify-between text-sm text-gray-300 mb-2 font-medium">
                <span className="flex items-center gap-1.5"><Star size={16} className="text-[#D4A24C]" fill="#D4A24C" /> {userStats.points} Poin Loyalitas</span>
                <span>Loyalty EXP ({userStats.exp}%)</span>
              </div>
              <div className="w-full bg-[#1A1615] h-3 rounded-full overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-[#C96A3D] to-[#D4A24C] h-full rounded-full transition-all duration-1000" style={{ width: `${userStats.exp}%` }}></div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <nav className="flex md:flex-wrap md:justify-center space-x-3 md:space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat} onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === cat ? 'bg-[#1A1615] text-[#D4A24C] shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
          
          <main className="mt-8">
            <h2 className="text-sm md:text-lg font-black mb-6 flex items-center text-[#1A1615] uppercase tracking-wider">
              <Flame size={18} className="text-[#C96A3D] mr-2" /> Pilihan Menu {activeTab}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredMenu.map((item) => {
                const cartItem = cart.find(i => i.id === item.id);
                return (
                  <div key={item.id} className="bg-white rounded-3xl p-4 md:p-5 shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-lg overflow-hidden group">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      {item.badge && <span className="absolute bottom-1 left-1 bg-[#C96A3D] text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">{item.badge}</span>}
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-black text-[#1A1615] text-sm md:text-base leading-tight">{item.name}</h4>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="flex justify-between items-end mt-3">
                        <div>
                          <span className="text-sm md:text-base font-black text-[#2D6A4F] block">Rp {item.price.toLocaleString('id-ID')}</span>
                          <span className="text-[9px] text-[#D4A24C] font-bold flex items-center gap-1 mt-0.5"><Star size={10} fill="#D4A24C"/> +{item.points} Pts</span>
                        </div>
                        
                        {cartItem ? (
                          <div className="flex items-center gap-2 bg-[#FDF8F5] p-1.5 rounded-xl border border-[#D4A24C]/30 shadow-sm">
                            <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-sm hover:bg-gray-50"><Minus size={14} /></button>
                            <span className="text-xs md:text-sm font-black w-4 md:w-6 text-center text-[#1A1615]">{cartItem.qty}</span>
                            <button onClick={() => addToCart(item)} className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-[#1A1615] rounded-lg shadow-sm text-[#D4A24C] hover:bg-[#2C2523]"><Plus size={14} /></button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(item)} className="bg-[#1A1615] hover:bg-[#2C2523] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95">Tambah</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent z-40 flex justify-center pointer-events-none">
            <button 
              onClick={() => setCustomerView('cart')} 
              className="w-full max-w-2xl bg-[#1A1615] hover:bg-[#2C2523] text-white p-4 md:p-5 rounded-2xl shadow-2xl flex justify-between items-center transition-transform transform hover:scale-[1.02] active:scale-95 pointer-events-auto border border-gray-800"
            >
              <div className="flex flex-col text-left">
                <span className="text-xs md:text-sm text-gray-300 font-medium">{cart.reduce((sum, i) => sum + i.qty, 0)} Menu • Rp {getCartTotal().toLocaleString('id-ID')}</span>
                <span className="text-sm md:text-base font-black text-[#D4A24C] flex items-center gap-1.5 mt-0.5">
                  <Sparkles size={14} className="text-[#D4A24C]" /> +{getEarnedPoints()} XP & Poin
                </span>
              </div>
              <div className="bg-[#D4A24C] text-[#1A1615] px-4 py-2.5 rounded-xl text-xs md:text-sm font-black flex items-center gap-2 uppercase tracking-wider shadow-sm">
                Lihat Pesanan <ChevronLeft size={16} className="rotate-180" />
              </div>
            </button>
          </div>
        )}

        {isVoucherModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-[#1A1615] space-y-6 relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsVoucherModalOpen(false)} className="absolute right-5 top-5 bg-gray-100 p-2 rounded-full text-gray-500 hover:text-black"><X size={20} /></button>
              <div className="flex items-center gap-3">
                <Tag size={24} className="text-[#C96A3D]" />
                <div>
                  <h3 className="font-black text-xl">Loyalty Exchange Market</h3>
                  <p className="text-xs text-gray-500 font-bold">Poin Anda: {userStats.points} Pts</p>
                </div>
              </div>

              <div className="space-y-4 divide-y divide-gray-100">
                {vouchers.map(v => {
                  const isRedeemed = customerClaimedVouchers.some(claim => claim.id === v.id);
                  const canRedeem = userStats.points >= v.pointsCost;
                  return (
                    <div key={v.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                          Cost: {v.pointsCost} Poin
                        </span>
                        <h4 className="font-black text-sm mt-1">{v.title}</h4>
                        <p className="text-xs text-gray-500">{v.desc}</p>
                      </div>
                      <div className="shrink-0 flex gap-2">
                        {isRedeemed ? (
                          <span className="bg-[#2D6A4F]/10 text-[#2D6A4F] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"><Check size={14}/> Diklaim</span>
                        ) : (
                          <button 
                            disabled={!canRedeem}
                            onClick={() => {
                              setUserStats(prev => ({ ...prev, points: prev.points - v.pointsCost }));
                              setCustomers(prev => prev.map(c => c.phone === userStats.phone ? { ...c, points: c.points - v.pointsCost } : c));
                              setCustomerClaimedVouchers(prev => [...prev, v]);
                              showToast(`Sukses klaim: ${v.title}`);
                            }}
                            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                              canRedeem ? 'bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] shadow' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Klaim Voucher
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCart = () => {
    const total = getCartTotalWithTax();
    const isRes = orderMode === 'reservation';
    const subtotal = getCartTotal();
    const discount = getVoucherDiscountAmount();
    return (
      <div className="min-h-screen bg-[#FDF8F5] pb-32 animate-in slide-in-from-right-4 text-left">
        <header className="bg-white p-4 md:p-6 sticky top-0 z-10 shadow-sm border-b border-gray-100 flex justify-center">
          <div className="w-full max-w-3xl flex items-center gap-4">
            <button onClick={() => setCustomerView('menu')} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><ChevronLeft size={20} /></button>
            <h1 className="font-black text-lg md:text-xl text-[#1A1615]">Detail Keranjang Pesanan</h1>
          </div>
        </header>
        <main className="p-5 md:p-8 w-full max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-sm flex justify-between items-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5"><Store size={60}/></div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Layanan</span>
              <p className="text-base md:text-lg font-black text-[#1A1615] mt-1">{isRes ? 'Reservasi & Pre-Order' : 'Makan di Tempat (Dine-in)'}</p>
            </div>
            <span className="bg-[#D4A24C]/15 text-[#D4A24C] font-black px-4 py-2.5 rounded-xl md:text-lg border border-[#D4A24C]/30 shadow-sm">Meja M-{userStats.table}</span>
          </div>

          <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-3">Daftar Pesanan</h3>
            <div className="space-y-4 pt-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <span className="font-black text-[#1A1615] bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-sm">{item.qty}x</span>
                    <div>
                      <p className="font-bold text-[#1A1615] text-sm md:text-base">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  <p className="font-black text-[#2D6A4F] text-sm md:text-base">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block flex items-center gap-2">
              <Tag size={16} className="text-[#C96A3D]" /> Gunakan Voucher Belanja
            </label>
            {customerClaimedVouchers.length === 0 ? (
              <p className="text-xs text-gray-400">Kamu belum memiliki voucher aktif. Tukarkan poin loyalitas di halaman menu.</p>
            ) : (
              <select 
                value={selectedVoucherId}
                onChange={e => setSelectedVoucherId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none transition-all font-semibold"
              >
                <option value="">-- Pilih Voucher Diklaim --</option>
                {customerClaimedVouchers.map(v => (
                  <option key={v.id} value={v.id}>{v.title} ({v.code})</option>
                ))}
              </select>
            )}
          </div>
          
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block flex items-center gap-2"><Edit size={14}/> Catatan Tambahan (Opsional)</label>
            <textarea value={customerForm.notes} onChange={e => setCustomerForm({...customerForm, notes: e.target.value})} rows="2" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm outline-none focus:border-[#D4A24C] transition-colors resize-none" placeholder="Contoh: Kopi jangan terlalu manis..."></textarea>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3">
            <div className="flex justify-between text-gray-500 text-sm font-semibold"><span>Subtotal Menu</span><span>Rp {subtotal.toLocaleString('id-ID')}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-[#C96A3D] text-sm font-semibold">
                <span>Diskon Voucher</span>
                <span>- Rp {discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500 text-sm font-semibold"><span>Pajak Layanan ({settings.taxPercentage}%)</span><span>Rp {((subtotal - discount) * (settings.taxPercentage/100)).toLocaleString('id-ID')}</span></div>
            <div className="pt-4 mt-2 border-t border-dashed border-gray-200 flex justify-between items-center font-black">
              <span className="text-[#1A1615] text-base md:text-lg">Total Tagihan</span>
              <span className="text-xl md:text-2xl text-[#1A1615]">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </main>
        
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] z-40 flex justify-center">
          <div className="max-w-3xl w-full">
            {isRes ? (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleCheckout('QRIS')} className="bg-[#2D6A4F] hover:bg-[#224f3b] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex justify-center items-center gap-2 shadow-lg transition-all"><QrCode size={18}/> Bayar DP (QRIS)</button>
                <button onClick={() => handleCheckout('Transfer Bank')} className="bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex justify-center items-center gap-2 shadow-lg transition-all"><CreditCard size={18}/> Bayar DP (Bank)</button>
              </div>
            ) : (
              <button onClick={() => handleCheckout('')} className="w-full bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] py-4.5 rounded-2xl font-black text-sm md:text-base uppercase tracking-widest shadow-xl flex justify-center items-center gap-2 transition-all">
                Kirim Pesanan ke Dapur <Flame size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    const currentOrder = globalOrders.find(o => o.orderId === currentCustomerOrderId);
    if (!currentOrder) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#FDF8F5] p-6 text-center">
          <Utensils size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-bold">Belum ada pesanan aktif saat ini.</p>
          <button onClick={() => setCustomerView('menu')} className="mt-4 bg-[#1A1615] text-[#D4A24C] px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md">Kembali ke Menu</button>
        </div>
      );
    }

    const stages = [
      { key: 'pending', label: 'Diterima Dapur', desc: 'Menunggu antrean koki' },
      { key: 'preparing', label: 'Sedang Dimasak', desc: 'Koki mengolah pesanan' },
      { key: 'ready', label: 'Siap Disajikan', desc: 'Pesanan siap diantar ke meja' },
      { key: 'completed', label: 'Selesai', desc: 'Selamat menikmati!' }
    ];

    const currentStageIndex = stages.findIndex(s => s.key === currentOrder.status);

    return (
      <div className="min-h-screen bg-[#FDF8F5] pb-28 animate-in fade-in duration-300 text-left">
        <header className="bg-gradient-to-b from-[#1E1917] to-[#120E0D] text-white p-6 rounded-b-[2.5rem] md:rounded-b-[4rem] text-center shadow-lg relative">
          <button onClick={() => setCustomerView('menu')} className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur text-white transition-all"><ChevronLeft size={18}/></button>
          <h1 className="text-2xl font-black text-[#D4A24C] mt-2">Status Pesanan Anda</h1>
          <p className="text-xs text-gray-400 mt-1">ID Nota: {currentOrder.orderId} • Meja M-{currentOrder.tableName}</p>
        </header>

        <main className="p-5 md:p-8 max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Clock size={16} className="text-[#C96A3D]"/> Real-time Order Tracker</h3>
            <div className="relative pl-6 border-l-2 border-gray-100 space-y-8 py-2 ml-2">
              {stages.map((stg, sIdx) => {
                const isActive = sIdx <= currentStageIndex;
                const isCurrent = sIdx === currentStageIndex;
                return (
                  <div key={stg.key} className="relative group">
                    <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 transition-all ${
                      isCurrent ? 'bg-[#D4A24C] border-[#1A1615] scale-125 animate-pulse' :
                      isActive ? 'bg-[#2D6A4F] border-white shadow-sm' : 'bg-gray-100 border-gray-200'
                    }`} />
                    <div className="pl-4">
                      <h4 className={`font-black text-sm ${isActive ? 'text-[#1A1615]' : 'text-gray-400'}`}>{stg.label}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{stg.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Coffee size={64}/></div>
            <div className="text-left">
              <span className="text-[9px] bg-[#D4A24C]/10 text-[#C96A3D] font-black px-3 py-1 rounded-lg border border-[#D4A24C]/20 uppercase tracking-wider">Free Highspeed WiFi</span>
              <h4 className="font-black text-sm text-[#1A1615] mt-2">Masuk ke WiFi {settings.wifiName}</h4>
              <p className="text-xs text-gray-500 font-bold mt-1 font-mono">Sandi: {settings.wifiPass}</p>
            </div>
            <button onClick={() => copyToClipboard(settings.wifiPass)} className="bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"><CheckSquare size={14}/> Salin Sandi</button>
          </div>
        </main>
      </div>
    );
  };

  const renderHistory = () => {
    const myHistory = globalOrders.filter(o => o.customerPhone === userStats.phone);
    return (
      <div className="min-h-screen bg-[#FDF8F5] animate-in slide-in-from-left-6 duration-300 pb-24 text-left">
        <header className="bg-white p-4 md:p-6 flex items-center gap-4 sticky top-0 z-10 shadow-sm border-b border-gray-100 justify-center">
          <div className="w-full max-w-3xl flex items-center gap-4">
            <button onClick={() => setCustomerView('menu')} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><ChevronLeft size={20} /></button>
            <h1 className="text-base md:text-xl font-black text-[#1A1615]">Riwayat Kunjungan</h1>
          </div>
        </header>
        <main className="p-5 md:p-8 w-full max-w-3xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-[#1A1615] to-[#2C2523] text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl relative overflow-hidden border border-[#D4A24C]/20">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D4A24C 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
            <div className="relative z-10">
              <p className="text-[10px] text-[#D4A24C] uppercase tracking-widest font-black mb-1 bg-[#D4A24C]/10 inline-block px-3 py-1 rounded-lg border border-[#D4A24C]/20">Member Profil</p>
              <p className="text-xl md:text-2xl font-black text-white mt-2">{userStats.name}</p>
              <p className="text-xs text-gray-400 font-mono mt-1 font-semibold">{userStats.phone}</p>
            </div>
            <div className="text-left md:text-right relative z-10 w-full md:w-auto flex md:block justify-between items-center border-t border-gray-700 md:border-none pt-5 md:pt-0 mt-4 md:mt-0">
              <span className="text-xs text-[#1A1615] bg-[#D4A24C] px-3 py-1.5 rounded-xl font-black inline-block shadow-sm uppercase tracking-wider">{userStats.level}</span>
              <p className="text-xl md:text-2xl font-black text-white mt-2 md:mt-1">{userStats.points} Pts</p>
            </div>
          </div>
          
          {myHistory.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="w-20 h-20 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <History size={32} className="text-gray-300" />
              </div>
              <p className="text-sm md:text-base text-gray-500 font-medium">Belum ada transaksi di akun nomor HP ini.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 pl-2">Transaksi Sebelumnya</h3>
              {myHistory.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 space-y-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-4 border-b border-gray-100 gap-3 md:gap-0">
                    <div>
                      <span className="font-mono text-gray-800 font-bold bg-gray-50 px-3 py-1 rounded-lg text-xs">{item.orderId}</span>
                      <span className="text-xs font-bold text-gray-500 ml-3 flex items-center inline-flex gap-1"><Clock size={12}/> Pukul {item.date}</span>
                    </div>
                    <span className={`text-[10px] md:text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider self-start md:self-auto border ${
                      item.paymentStatus === 'paid' 
                        ? 'bg-[#2D6A4F]/10 text-[#2D6A4F] border-[#2D6A4F]/20' 
                        : item.paymentStatus === 'dp_paid' ? 'bg-[#C96A3D]/10 text-[#C96A3D] border-[#C96A3D]/20' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {item.paymentStatus === 'paid' ? 'Lunas' : item.paymentStatus === 'dp_paid' ? 'DP Terbayar' : 'Belum Bayar'}
                    </span>
                  </div>
                  
                  <div className="space-y-4 pt-2 divide-y divide-gray-50">
                    {item.items.map((menu, mIdx) => {
                      const feedbackKey = `${item.orderId}-${menu.id}`;
                      const isRated = ratedItems[feedbackKey];
                      const isOpen = ratingForm.activeItemKey === feedbackKey;
                      return (
                        <div key={mIdx} className="pt-3 first:pt-0 space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm font-bold text-gray-700">{menu.qty}x <span className="font-medium ml-1">{menu.name}</span></span>
                              <p className="text-xs text-gray-500 mt-1">Rp {(menu.price * menu.qty).toLocaleString('id-ID')}</p>
                            </div>
                            {isRated ? (
                              <span className="bg-[#2D6A4F]/10 text-[#2D6A4F] text-[9px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1"><Check size={11}/> Ulasan Terkirim</span>
                            ) : (
                              <button 
                                onClick={() => setRatingForm(prev => ({ ...prev, activeItemKey: isOpen ? null : feedbackKey }))}
                                className="bg-white hover:bg-gray-100 text-[#1A1615] border border-gray-200 px-2.5 py-1 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 shadow-sm"
                              >
                                <Star size={11} fill="#D4A24C" className="text-[#D4A24C]"/> Ulas Menu
                              </button>
                            )}
                          </div>

                          {isOpen && !isRated && (
                            <div className="pt-3 border-t border-dashed border-gray-100 space-y-3 animate-in slide-in-from-top-2">
                              <div className="flex gap-2 items-center">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Beri Rating:</span>
                                {[1, 2, 3, 4, 5].map(starNum => (
                                  <button 
                                    key={starNum} type="button" 
                                    onClick={() => setRatingForm(prev => ({ ...prev, rating: starNum }))}
                                    className="focus:outline-none"
                                  >
                                    <Star 
                                      size={16} 
                                      fill={starNum <= ratingForm.rating ? "#D4A24C" : "none"} 
                                      className={starNum <= ratingForm.rating ? "text-[#D4A24C]" : "text-gray-300"} 
                                    />
                                  </button>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Bagaimana rasanya? Tulis ulasan disini..."
                                  value={ratingForm.comment}
                                  onChange={e => setRatingForm(prev => ({ ...prev, comment: e.target.value }))}
                                  className="flex-1 bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-2.5 text-xs outline-none font-semibold text-gray-800"
                                />
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    if (!ratingForm.comment.trim()) {
                                      showToast("Silakan ketik ulasan terlebih dahulu!");
                                      return;
                                    }
                                    const newFb = {
                                      id: feedbacks.length + 1,
                                      menuId: menu.id,
                                      menuName: menu.name,
                                      customerName: ratingForm.isAnonymous ? "Pelanggan Anonim" : userStats.name,
                                      rating: ratingForm.rating,
                                      comment: ratingForm.comment,
                                      isAnonymous: ratingForm.isAnonymous,
                                      date: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                                    };
                                    setFeedbacks(prev => [newFb, ...prev]);
                                    setRatedItems(prev => ({ ...prev, [feedbackKey]: true }));
                                    setRatingForm({ rating: 5, comment: '', isAnonymous: false, activeItemKey: null });
                                    showToast("Ulasan berhasil dikirim!");
                                  }}
                                  className="bg-[#1A1615] text-[#D4A24C] font-black text-[10px] px-4 rounded-xl uppercase tracking-wider shadow-sm"
                                >
                                  Kirim
                                </button>
                              </div>
                              <label className="flex items-center gap-1.5 cursor-pointer pt-1">
                                <input 
                                  type="checkbox" 
                                  checked={ratingForm.isAnonymous}
                                  onChange={e => setRatingForm(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                                  className="rounded text-[#D4A24C] focus:ring-[#D4A24C] w-3.5 h-3.5"
                                />
                                <span className="text-[9px] font-bold text-gray-500 uppercase">Kirim sebagai Anonim</span>
                              </label>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                    <span className="text-[#D4A24C] font-black text-xs flex items-center gap-1.5 bg-[#1A1615] px-3 py-1.5 rounded-xl">
                      <Star size={14} fill="#D4A24C" /> +{item.pointsEarned} Pts
                    </span>
                    <span className="font-black text-[#1A1615] text-lg">Rp {item.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  };

  const renderKitchen = () => {
    const pendingOrders = globalOrders.filter(o => o.status === 'pending');
    const preparingOrders = globalOrders.filter(o => o.status === 'preparing');
    const historyOrders = globalOrders.filter(o => ['ready', 'completed'].includes(o.status));
    return (
      <div className="min-h-screen bg-white text-[#1A1615] p-6 md:p-10 animate-in fade-in duration-300 text-left">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200 mb-8">
          <div>
            <div className="flex items-center gap-3 text-[#C96A3D] mb-2">
              <span className="font-black tracking-widest text-xs uppercase bg-[#C96A3D]/10 text-[#C96A3D] px-3 py-1 rounded-lg">Kitchen Staff Panel</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1615]">Dasbor Produksi Dapur</h1>
          </div>
          <div className="flex gap-4 items-center">
            <span className="bg-emerald-50 px-4 py-2.5 rounded-xl text-xs border border-emerald-100 flex items-center gap-2 font-bold text-emerald-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Terhubung (Real-time)
            </span>
            <button onClick={() => handleRoleLogout('kitchen')} className="bg-white hover:bg-gray-50 text-gray-500 p-2.5 rounded-xl transition-all border border-gray-200"><LogOut size={16}/></button>
          </div>
        </header>

        <div className="flex gap-2 mb-8 bg-gray-50 p-1.5 rounded-2xl w-fit border border-gray-200">
          <button onClick={() => setKitchenTab('active')} className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all ${kitchenTab==='active'?'bg-white text-[#1A1615] shadow-sm border border-gray-200':'text-gray-500 hover:text-black'}`}>Antrean Aktif</button>
          <button onClick={() => setKitchenTab('history')} className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all ${kitchenTab==='history'?'bg-white text-[#1A1615] shadow-sm border border-gray-200':'text-gray-500 hover:text-black'}`}>Riwayat Masak</button>
        </div>

        {kitchenTab === 'active' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 shadow-inner">
              <h2 className="font-black text-sm uppercase tracking-wider text-gray-600 mb-6 flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span> Pesanan Baru Masuk</span>
                <span className="bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">{pendingOrders.length}</span>
              </h2>
              <div className="space-y-4">
                {pendingOrders.map(o => (
                  <div key={o.orderId} className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group hover:border-red-300 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-[#1A1615] text-[#D4A24C] text-xs font-black px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">Meja {o.tableName}</span>
                      <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded"><Clock size={12} className="inline mr-1"/>{o.date}</span>
                    </div>
                    <h4 className="font-black text-sm text-[#1A1615] mb-2">{o.customerName}</h4>
                    {o.notes && <p className="text-xs bg-amber-50 text-amber-800 p-2.5 rounded-xl mb-3 border border-amber-200 font-semibold italic flex gap-2"><AlertTriangle size={14} className="shrink-0"/> {o.notes}</p>}
                    <ul className="text-sm font-semibold text-gray-700 space-y-2 mb-5 border-t border-gray-100 pt-3">
                      {o.items.map((i,idx) => <li key={idx} className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>{i.name}</span><span className="font-black text-lg bg-gray-50 px-2 rounded">x{i.qty}</span></li>)}
                    </ul>
                    <button onClick={() => setGlobalOrders(prev => prev.map(x => x.orderId === o.orderId ? {...x, status: 'preparing'} : x))} className="w-full bg-[#D4A24C] hover:bg-[#c59443] text-[#1A1615] py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex justify-center items-center gap-2 shadow-md transition-all active:scale-95">Mulai Proses Masak <Flame size={16}/></button>
                  </div>
                ))}
                {pendingOrders.length === 0 && <p className="text-center text-xs font-bold text-gray-400 py-12">Belum ada pesanan masuk.</p>}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 shadow-inner">
              <h2 className="font-black text-sm uppercase tracking-wider text-gray-600 mb-6 flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> Sedang Dimasak</span>
                <span className="bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">{preparingOrders.length}</span>
              </h2>
              <div className="space-y-4">
                {preparingOrders.map(o => (
                  <div key={o.orderId} className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">Meja {o.tableName}</span>
                      <span className="text-xs font-bold text-gray-400"><Clock size={12} className="inline mr-1"/>{o.date}</span>
                    </div>
                    <ul className="text-sm font-semibold text-gray-700 space-y-2 mb-5">
                      {o.items.map((i,idx) => <li key={idx} className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>{i.name}</span><span className="font-black text-lg text-blue-600">x{i.qty}</span></li>)}
                    </ul>
                    <button onClick={() => setGlobalOrders(prev => prev.map(x => x.orderId === o.orderId ? {...x, status: 'ready'} : x))} className="w-full bg-[#2D6A4F] hover:bg-[#224f3b] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex justify-center items-center gap-2 shadow-md transition-all active:scale-95">Selesai & Sajikan <CheckCircle2 size={16}/></button>
                  </div>
                ))}
                {preparingOrders.length === 0 && <p className="text-center text-xs font-bold text-gray-400 py-12">Tidak ada masakan diproses.</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-black text-sm uppercase tracking-wider text-gray-800 mb-6 flex items-center gap-2"><CheckSquare size={16} className="text-[#2D6A4F]"/> Daftar Pesanan Selesai Hari Ini</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr><th className="p-4 rounded-tl-xl">ID Pesanan</th><th className="p-4">Meja</th><th className="p-4">Waktu</th><th className="p-4 rounded-tr-xl">Detail Menu Disajikan</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {historyOrders.map(o => (
                    <tr key={o.orderId} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-gray-800">{o.orderId}</td>
                      <td className="p-4"><span className="bg-[#1A1615] text-white px-2 py-1 rounded text-xs font-bold">M-{o.tableName}</span></td>
                      <td className="p-4 text-gray-500">{o.date}</td>
                      <td className="p-4 text-xs leading-relaxed text-gray-600">{o.items.map(i=>`${i.qty}x ${i.name}`).join(', ')}</td>
                    </tr>
                  ))}
                  {historyOrders.length === 0 && <tr><td colSpan="4" className="text-center p-8 text-gray-400 font-bold">Belum ada pesanan yang selesai.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCashier = () => {
    const activeBills = globalOrders.filter(o => o.paymentStatus === 'unpaid' && o.status !== 'pending_reservation' && o.status !== 'reserved');
    const reservations = globalOrders.filter(o => o.type === 'reservation' && (o.paymentStatus === 'dp_unpaid' || o.paymentStatus === 'dp_paid'));
    const transactionHistory = globalOrders.filter(o => o.paymentStatus === 'paid');
    const totalRevenue = transactionHistory.reduce((sum, o) => sum + o.total, 0);
    return (
      <div className="min-h-screen bg-[#FDF8F5] p-6 md:p-10 animate-in fade-in duration-300 text-left">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200 mb-8">
          <div>
            <div className="flex items-center gap-3 text-[#2D6A4F] mb-2">
              <span className="font-black tracking-widest text-xs uppercase bg-[#2D6A4F]/10 text-[#2D6A4F] px-3 py-1 rounded-lg">Point of Sales</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1615]">Kasir KeudeKu Warkop</h1>
          </div>
          <button onClick={() => handleRoleLogout('cashier')} className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-500 p-3 rounded-xl flex items-center gap-2 text-xs font-bold transition-all"><LogOut size={16}/> Selesai</button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Pendapatan (Hari Ini)</p>
              <h3 className="text-2xl font-black text-[#2D6A4F]">Rp {totalRevenue.toLocaleString('id-ID')}</h3>
            </div>
            <div className="w-12 h-12 bg-[#2D6A4F]/10 rounded-2xl flex items-center justify-center text-[#2D6A4F]"><TrendingUp size={24} /></div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Transaksi Berhasil</p>
              <h3 className="text-2xl font-black text-[#1A1615]">{transactionHistory.length} Nota Lunas</h3>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600"><CheckCircle2 size={24} /></div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Menunggu Pembayaran</p>
              <h3 className="text-2xl font-black text-[#C96A3D]">{activeBills.length} Tagihan</h3>
            </div>
            <div className="w-12 h-12 bg-[#C96A3D]/10 rounded-2xl flex items-center justify-center text-[#C96A3D]"><Clock size={24} /></div>
          </div>
        </section>

        <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl w-full overflow-x-auto border border-gray-200 shadow-sm scrollbar-hide">
          <button onClick={() => setCashierTab('unpaid')} className={`px-5 py-3 text-xs font-black rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${cashierTab === 'unpaid' ? 'bg-[#1A1615] text-[#D4A24C] shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}>
            <Receipt size={16}/> Tagihan Aktif ({activeBills.length})
          </button>
          <button onClick={() => setCashierTab('reservations')} className={`px-5 py-3 text-xs font-black rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${cashierTab === 'reservations' ? 'bg-[#1A1615] text-[#D4A24C] shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}>
            <Calendar size={16}/> Reservasi ({reservations.length})
          </button>
          <button onClick={() => setCashierTab('manual')} className={`px-5 py-3 text-xs font-black rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${cashierTab === 'manual' ? 'bg-[#1A1615] text-[#D4A24C] shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}>
            <FilePlus size={16}/> Input Manual +
          </button>
          <button onClick={() => setCashierTab('history')} className={`px-5 py-3 text-xs font-black rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${cashierTab === 'history' ? 'bg-[#1A1615] text-[#D4A24C] shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}>
            <History size={16}/> Riwayat Transaksi
          </button>
        </div>

        {cashierTab === 'unpaid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBills.map(o => (
              <div key={o.orderId} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#1A1615] text-white font-black px-3 py-1.5 rounded-xl text-xs shadow-sm">Meja M-{o.tableName}</span>
                    <span className="font-mono text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">{o.orderId}</span>
                  </div>
                  <h3 className="font-black text-lg text-[#1A1615]">{o.customerName}</h3>
                  <p className="text-xs text-gray-500 font-medium mb-2">{o.customerPhone}</p>
                  
                  <div className="my-4 space-y-2 border-t border-b border-gray-100 py-4 text-xs font-semibold text-gray-600">
                    {o.items.map((i,idx) => <div key={idx} className="flex justify-between items-center"><span>{i.qty}x {i.name}</span><span>Rp {(i.price*i.qty).toLocaleString('id-ID')}</span></div>)}
                  </div>
                  {o.discountAmount > 0 && (
                    <div className="flex justify-between text-xs font-bold text-[#C96A3D] mb-2 px-1">
                      <span>Voucher Discount</span><span>- Rp {o.discountAmount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center font-black mb-5 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-600 text-sm">TOTAL</span><span className="text-[#2D6A4F] text-lg">Rp {o.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-2">Metode Pembayaran</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setPaymentModal({isOpen: true, orderId: o.orderId, total: o.total, method: 'QRIS'})} className="bg-[#2D6A4F] hover:bg-[#224f3b] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"><QrCode size={16}/> QRIS</button>
                    <button onClick={() => setPaymentModal({isOpen: true, orderId: o.orderId, total: o.total, method: 'Cash'})} className="bg-[#D4A24C] hover:bg-[#c59443] text-[#1A1615] py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"><Banknote size={16}/> TUNAI</button>
                  </div>
                </div>
              </div>
            ))}
            {activeBills.length === 0 && <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm"><CheckCircle2 className="text-gray-300 mx-auto mb-4" size={48} /><p className="text-sm font-bold text-gray-400">Tidak ada tagihan makan di tempat yang belum dibayar.</p></div>}
          </div>
        )}

        {cashierTab === 'reservations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map(o => (
              <div key={o.orderId} className="bg-white rounded-3xl p-6 border border-[#C96A3D]/30 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 bg-[#C96A3D] text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow-sm">RESERVASI</div>
                <div>
                  <h3 className="font-black text-xl text-[#1A1615]">{o.customerName}</h3>
                  <p className="text-xs text-gray-500 font-semibold mb-4 mt-1"><Phone size={12} className="inline mr-1"/>{o.customerPhone} &nbsp;|&nbsp; <MapPin size={12} className="inline mr-1 text-[#D4A24C]"/>Meja M-{o.tableName}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-2xl text-xs space-y-3 mb-5 border border-gray-100 shadow-inner">
                    <div className="flex justify-between font-semibold text-gray-600"><span>Total Tagihan Pesanan:</span><span>Rp {o.total.toLocaleString('id-ID')}</span></div>
                    <div className="flex justify-between font-black items-center"><span className="text-[#C96A3D]">Status DP (50%):</span><span className={`px-2 py-1 rounded uppercase ${o.paymentStatus === 'dp_paid' ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]' : 'bg-red-50 text-red-600'}`}>Rp {o.dpAmount.toLocaleString('id-ID')} ({o.paymentStatus === 'dp_paid' ? 'LUNAS' : 'PENDING'})</span></div>
                    <div className="flex justify-between font-black text-[#1A1615] pt-3 border-t border-dashed border-gray-200 text-sm"><span>Sisa Pelunasan:</span><span>Rp {(o.total - o.dpAmount).toLocaleString('id-ID')}</span></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {o.paymentStatus === 'dp_unpaid' && (
                    <button onClick={() => { setGlobalOrders(prev => prev.map(x => x.orderId === o.orderId ? {...x, paymentStatus: 'dp_paid', status: 'reserved'} : x)); showToast("DP Berhasil Dikonfirmasi!"); }} className="flex-1 bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all">Konfirmasi DP Masuk</button>
                  )}
                  {o.paymentStatus === 'dp_paid' && o.status === 'reserved' && (
                    <button onClick={() => confirmArrival(o.orderId, o.tableName)} className="flex-1 bg-white border-2 border-[#1A1615] text-[#1A1615] hover:bg-gray-50 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all flex justify-center items-center gap-2">Pelanggan Tiba <ArrowRight size={16}/></button>
                  )}
                  {o.paymentStatus === 'dp_paid' && (o.status === 'completed' || o.status === 'ready') && (
                     <button onClick={() => setPaymentModal({isOpen: true, orderId: o.orderId, total: o.total - o.dpAmount, method: 'Cash'})} className="flex-1 bg-[#2D6A4F] hover:bg-[#224f3b] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all">Lunasi Sisa & Tutup Meja</button>
                  )}
                </div>
              </div>
            ))}
            {reservations.length === 0 && <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm"><Calendar className="text-gray-300 mx-auto mb-4" size={48} /><p className="text-sm font-bold text-gray-400">Tidak ada reservasi aktif saat ini.</p></div>}
          </div>
        )}

        {cashierTab === 'manual' && (
          <form onSubmit={handleManualOrderSubmit} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="bg-[#D4A24C]/20 p-2 rounded-xl text-[#C96A3D]"><FilePlus size={24}/></div>
              <div><h2 className="font-black text-xl text-[#1A1615]">Input Pesanan Manual</h2><p className="text-xs font-medium text-gray-500">Buat pesanan langsung dari mesin kasir.</p></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Pelanggan</label><input required type="text" value={manualOrderForm.name} onChange={e=>setManualOrderForm({...manualOrderForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A1615] p-3.5 rounded-xl text-sm font-semibold outline-none transition-all" placeholder="Masukkan nama..." /></div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nomor HP</label><input required type="tel" value={manualOrderForm.phone} onChange={e=>setManualOrderForm({...manualOrderForm, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A1615] p-3.5 rounded-xl text-sm font-semibold outline-none transition-all" placeholder="08..." /></div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pilih Meja</label>
                <select required value={manualOrderForm.table} onChange={e=>setManualOrderForm({...manualOrderForm, table: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A1615] p-3.5 rounded-xl text-sm font-semibold outline-none transition-all">
                  <option value="">- Pilih Meja Tersedia -</option>
                  {tables.filter(t => t.status === 'available').map(t => <option key={t.id} value={t.id}>Meja {t.id} (Kapasitas: {t.capacity})</option>)}
                </select>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Catatan Dapur (Opsional)</label><input type="text" value={manualOrderForm.notes} onChange={e=>setManualOrderForm({...manualOrderForm, notes: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A1615] p-3.5 rounded-xl text-sm font-semibold outline-none transition-all" placeholder="Contoh: Es dipisah..." /></div>
            </div>
            
            <div className="border-t border-dashed border-gray-200 pt-6 mt-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Tambahkan Menu ke Pesanan</label>
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <select value={selectedMenuItem} onChange={e=>setSelectedMenuItem(e.target.value)} className="flex-1 bg-white border-2 border-gray-200 focus:border-[#D4A24C] p-4 rounded-xl text-sm font-bold outline-none transition-all shadow-sm">
                  <option value="">-- Cari & Pilih Menu Makanan/Minuman --</option>
                  {menuItems.filter(m=>m.status==='Active').map(m => <option key={m.id} value={m.id}>{m.name} - Rp {m.price.toLocaleString('id-ID')}</option>)}
                </select>
                <button type="button" onClick={() => {
                  if(!selectedMenuItem) return;
                  const item = menuItems.find(m => m.id.toString() === selectedMenuItem);
                  const exists = manualOrderForm.items.find(i => i.id === item.id);
                  if(exists) setManualOrderForm({...manualOrderForm, items: manualOrderForm.items.map(i => i.id === item.id ? {...i, qty: i.qty+1} : i)});
                  else setManualOrderForm({...manualOrderForm, items: [...manualOrderForm.items, {...item, qty: 1}]});
                  setSelectedMenuItem('');
                }} className="bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-md transition-all active:scale-95">Tambah +</button>
              </div>
              
              {manualOrderForm.items.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 mb-6">
                  <ul className="space-y-3 divide-y divide-gray-100">
                    {manualOrderForm.items.map(i => (
                      <li key={i.id} className="flex justify-between items-center text-sm pt-2 first:pt-0">
                        <span className="font-bold text-gray-700 flex items-center gap-3"><span className="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs">{i.qty}x</span> {i.name}</span>
                        <span className="font-black text-[#2D6A4F]">Rp {(i.price * i.qty).toLocaleString('id-ID')}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-black text-base items-center">
                    <span className="text-gray-600 uppercase tracking-widest text-xs">Total (+Pajak)</span>
                    <span>Rp {(manualOrderForm.items.reduce((s, i) => s + (i.price * i.qty), 0) * (1 + settings.taxPercentage/100)).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}
              
              <button type="submit" className="w-full bg-gradient-to-r from-[#D4A24C] to-[#C96A3D] hover:from-[#c59443] hover:to-[#b05c33] text-[#1A1615] py-4 rounded-xl font-black text-base uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"><CheckCircle2 size={20}/> Simpan & Kirim ke Dapur</button>
            </div>
          </form>
        )}

        {cashierTab === 'history' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden text-left">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
              <span className="font-black text-sm text-[#1A1615] uppercase tracking-wider">Log Transaksi Lunas</span>
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-4 top-3.5 text-gray-400" />
                <input type="text" value={cashierSearch} onChange={(e) => setCashierSearch(e.target.value)} placeholder="Cari ID nota atau pelanggan..." className="w-full bg-white border border-gray-200 focus:border-[#D4A24C] rounded-xl py-3 pl-12 pr-4 text-xs font-bold outline-none shadow-sm transition-all" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white text-gray-400 uppercase tracking-widest font-black border-b border-gray-200 text-[10px]">
                  <tr><th className="p-5">ID Nota</th><th className="p-5">Meja</th><th className="p-5">Pelanggan</th><th className="p-5">Metode</th><th className="p-5 text-right">Total Biaya</th><th className="p-5 text-center">Struk</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                  {transactionHistory.filter(o => o.customerName.toLowerCase().includes(cashierSearch.toLowerCase()) || o.orderId.toLowerCase().includes(cashierSearch.toLowerCase())).map(order => (
                    <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5 font-mono font-bold text-[#1A1615]">{order.orderId}</td>
                      <td className="p-5"><span className="bg-gray-100 border border-gray-200 text-gray-800 px-3 py-1.5 rounded-lg font-bold">M-{order.tableName}</span></td>
                      <td className="p-5 text-[#1A1615] font-black">{order.customerName}</td>
                      <td className="p-5"><span className="bg-[#2D6A4F]/10 text-[#2D6A4F] border border-[#2D6A4F]/20 px-2.5 py-1 rounded-md text-[10px] font-black uppercase">{order.paymentMethod || 'Tunai'}</span></td>
                      <td className="p-5 text-right font-black text-[#2D6A4F] text-sm">Rp {order.total.toLocaleString('id-ID')}</td>
                      <td className="p-5 text-center"><button onClick={() => setActiveReceipt(order)} className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 p-2.5 rounded-xl transition-all shadow-sm"><Printer size={16} /></button></td>
                    </tr>
                  ))}
                  {transactionHistory.length === 0 && <tr><td colSpan="6" className="text-center p-10 text-gray-400 font-bold">Data transaksi tidak ditemukan.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {paymentModal.isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-in fade-in">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm relative shadow-2xl">
              <button onClick={() => setPaymentModal({...paymentModal, isOpen: false})} className="absolute top-5 right-5 text-gray-400 hover:text-black bg-gray-50 p-1 rounded-full transition-colors"><X size={20}/></button>
              
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${paymentModal.method === 'Cash' ? 'bg-[#D4A24C]/20 text-[#C96A3D]' : 'bg-[#2D6A4F]/20 text-[#2D6A4F]'}`}>
                  {paymentModal.method === 'Cash' ? <Banknote size={32}/> : <QrCode size={32}/>}
                </div>
                <h3 className="font-black text-xl text-[#1A1615] mb-1">Pembayaran {paymentModal.method}</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">ID: {paymentModal.orderId}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6 text-center shadow-inner">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Tagihan Lunas</p>
                <span className="font-black text-3xl text-[#1A1615]">Rp {paymentModal.total.toLocaleString('id-ID')}</span>
              </div>
              
              {paymentModal.method === 'Cash' && (
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block text-center">Uang Diterima dari Pelanggan (Rp)</label>
                    <input type="number" autoFocus value={cashGiven} onChange={e=>setCashGiven(e.target.value)} className="w-full bg-white border-2 border-gray-200 focus:border-[#D4A24C] p-4 rounded-xl text-xl font-black text-center outline-none transition-colors shadow-sm" placeholder="0" />
                  </div>
                  <div className={`p-4 rounded-xl text-sm flex justify-between items-center border ${Number(cashGiven) >= paymentModal.total ? 'bg-[#2D6A4F]/10 border-[#2D6A4F]/20' : 'bg-red-50 border-red-100'}`}>
                    <span className="font-black text-gray-600 uppercase tracking-widest text-[10px]">Uang Kembalian:</span>
                    <span className={`font-black text-xl ${Number(cashGiven) >= paymentModal.total ? 'text-[#2D6A4F]' : 'text-red-500'}`}>
                      Rp {cashGiven ? (Number(cashGiven) >= paymentModal.total ? (Number(cashGiven) - paymentModal.total).toLocaleString('id-ID') : '0') : '0'}
                    </span>
                  </div>
                </div>
              )}
              <button onClick={handleCashierPayment} className="w-full bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] py-4 rounded-xl font-black text-sm uppercase tracking-wider flex justify-center items-center gap-2 shadow-xl transition-all active:scale-95">
                <Printer size={18}/> Proses & Cetak Struk
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAdminView = () => {
    const totalTransactions = globalOrders.filter(o => o.paymentStatus === 'paid');
    const totalRevenue = totalTransactions.reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = totalTransactions.length > 0 ? (totalRevenue / totalTransactions.length) : 0;
    
    const reportMultiplier = reportTimeRange === 'Hari Ini' ? 1.0 : reportTimeRange === '7 Hari' ? 5.2 : 22.4;
    const reportRevenue = Math.round(totalRevenue * reportMultiplier);
    const reportTax = Math.round(reportRevenue * (settings.taxPercentage / 100));
    const reportOrdersCount = Math.round(totalTransactions.length * reportMultiplier);

    return (
      <div className="min-h-screen bg-[#FDF8F5] text-[#1A1615] flex flex-col md:flex-row animate-in fade-in duration-300 text-left">
        <aside className="w-full md:w-64 bg-[#1A1615] text-white p-6 flex flex-col gap-6 md:min-h-screen justify-between shrink-0 shadow-2xl relative z-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-6 border-b border-gray-800">
              <div className="h-9 w-9 bg-white rounded-lg flex items-center justify-center text-[#1A1615] font-black"><Shield size={20} /></div>
              <div>
                <h2 className="font-black text-sm tracking-widest text-[#D4A24C] uppercase">KeudeKu Owner</h2>
                <p className="text-[10px] text-gray-500 font-semibold mt-0.5">SaaS Control Panel</p>
              </div>
            </div>
            <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
              {[
                { id: 'dashboard', label: 'Dasbor Bisnis', icon: LayoutDashboard },
                { id: 'reports', label: 'Laporan Keuangan', icon: FileText },
                { id: 'menu', label: 'Kelola Menu', icon: Menu },
                { id: 'vouchers', label: 'Kelola Voucher', icon: Tag },
                { id: 'tables', label: 'QR Meja', icon: QrCode },
                { id: 'customers', label: 'Database Member', icon: Users },
                { id: 'feedback', label: 'Ulasan & Feedback', icon: Heart },
                { id: 'settings', label: 'Pengaturan & Brand', icon: Settings }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAdminTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap md:w-full ${
                      adminTab === item.id 
                        ? 'bg-[#D4A24C] text-[#1A1615] shadow-md' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <button 
            onClick={() => handleRoleLogout('admin')}
            className="w-full bg-red-900/30 hover:bg-red-900/50 text-red-400 py-3 rounded-xl text-xs font-bold border border-red-900/30 flex items-center justify-center gap-2 mt-6 transition-all"
          >
            <LogOut size={14} /> Selesai Sesi Admin
          </button>
        </aside>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {adminTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <p className="text-[10px] font-black text-[#C96A3D] uppercase tracking-widest mb-1">Warkop Analytics Suite</p>
                  <h1 className="text-2xl md:text-3xl font-black">Dasbor Utama Owner</h1>
                </div>
                <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
                  <span className="w-2.5 h-2.5 bg-[#2D6A4F] rounded-full animate-pulse"></span>
                  Metrik Live
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Omset Hari Ini</p>
                    <h3 className="text-xl font-black text-[#2D6A4F]">Rp {totalRevenue.toLocaleString('id-ID')}</h3>
                  </div>
                  <div className="w-12 h-12 bg-[#2D6A4F]/10 rounded-2xl flex items-center justify-center text-[#2D6A4F]"><TrendingUp size={24} /></div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Kunjungan Meja</p>
                    <h3 className="text-xl font-black text-[#1A1615]">{globalOrders.length} Sesi QR Meja</h3>
                  </div>
                  <div className="w-12 h-12 bg-[#D4A24C]/20 rounded-2xl flex items-center justify-center text-[#C96A3D]"><QrCode size={24} /></div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Rata-rata Order</p>
                    <h3 className="text-xl font-black text-[#1A1615]">Rp {avgOrderValue.toLocaleString('id-ID')}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600"><Percent size={24} /></div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Member Terdaftar</p>
                    <h3 className="text-xl font-black text-[#C96A3D]">{customers.length} Akun</h3>
                  </div>
                  <div className="w-12 h-12 bg-[#C96A3D]/10 rounded-2xl flex items-center justify-center text-[#C96A3D]"><Users size={24} /></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-100 pb-3">Produk Paling Laris</h3>
                  <div className="space-y-5">
                    {menuItems.slice(0, 3).map((item, idx) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm font-black text-gray-700 shadow-sm">{idx+1}</span>
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                          <div>
                            <p className="text-sm font-black text-[#1A1615]">{item.name}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{item.category}</p>
                          </div>
                        </div>
                        <span className="bg-[#2D6A4F]/10 text-[#2D6A4F] text-[10px] font-black px-3 py-1.5 rounded-lg border border-[#2D6A4F]/20 font-mono">Rp {item.price.toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-500 mb-6 border-b border-gray-100 pb-3">Status Meja Dine-In</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {tables.map(tbl => (
                      <div key={tbl.id} className={`p-4 rounded-2xl border text-center relative overflow-hidden ${tbl.status === 'occupied' ? 'bg-[#C96A3D]/10 border-[#C96A3D]/30' : tbl.status === 'reserved' ? 'bg-[#D4A24C]/10 border-[#D4A24C]/30' : 'bg-gray-50 border-gray-200'}`}>
                        <p className={`text-sm font-black ${tbl.status === 'occupied' ? 'text-[#C96A3D]' : tbl.status === 'reserved' ? 'text-[#D4A24C]' : 'text-gray-600'}`}>M-{tbl.id}</p>
                        <p className={`text-[8px] font-black uppercase tracking-widest mt-1.5 ${tbl.status === 'occupied' ? 'text-[#C96A3D]' : tbl.status === 'reserved' ? 'text-[#D4A24C]' : 'text-gray-400'}`}>
                          {tbl.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'reports' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Laporan Keuangan</h1>
                  <p className="text-xs text-gray-500 font-medium font-sans">Analisis omset bersih, akumulasi potongan pajak, dan ekspor data penjualan.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex gap-1 bg-white border border-gray-200 p-1.5 rounded-xl shadow-sm">
                    {['Hari Ini', '7 Hari', 'Bulan Ini'].map(range => (
                      <button
                        key={range} onClick={() => setReportTimeRange(range)}
                        className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${reportTimeRange === range ? 'bg-[#1A1615] text-[#D4A24C] shadow-md' : 'text-gray-400 hover:text-black'}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={handleExportFinancialPDF}
                    className="bg-[#2D6A4F] hover:bg-[#224f3b] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Printer size={16} /> Cetak PDF Asli
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Omset Bersih</span>
                    <TrendingUp size={20} className="text-[#2D6A4F]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#2D6A4F]">Rp {(reportRevenue - reportTax).toLocaleString('id-ID')}</h3>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Sesudah potongan pajak {settings.taxPercentage}%</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pajak Terkumpul</span>
                    <Percent size={20} className="text-[#C96A3D]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#C96A3D]">Rp {reportTax.toLocaleString('id-ID')}</h3>
                    <p className="text-xs text-gray-500 mt-2 font-medium font-mono">Dana titipan pajak {settings.taxPercentage}%</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaksi Lunas</span>
                    <CheckSquare size={20} className="text-[#D4A24C]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1A1615]">{reportOrdersCount} <span className="text-lg">Nota</span></h3>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Rata-rata: Rp {avgOrderValue.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'menu' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Kelola Menu</h1>
                  <p className="text-xs text-gray-500 font-medium font-sans">Ubah harga, status ketersediaan, dan poin loyalitas dari setiap menu.</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingMenuItem(null);
                    setMenuForm({ id: '', name: '', category: 'Coffee', price: '', badge: '', points: '10', desc: '', image: '', status: 'Active' });
                    setIsAddingMenuItem(true);
                  }} 
                  className="bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <Plus size={16} /> Tambah Menu
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map(item => (
                  <div key={item.id} className={`bg-white rounded-3xl border shadow-sm transition-all overflow-hidden flex flex-col justify-between hover:shadow-lg ${item.status === 'Inactive' ? 'opacity-60 border-dashed border-gray-300' : 'border-gray-100'}`}>
                    <div className="h-48 w-full relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <span className="absolute bottom-3 left-3 bg-[#1A1615] text-[#D4A24C] text-xs font-black px-3 py-1.5 rounded-lg border border-[#D4A24C]/30 shadow-sm">Rp {item.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] bg-gray-100 px-3 py-1 rounded-lg font-black uppercase tracking-widest text-gray-600 border border-gray-200">{item.category}</span>
                          <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border ${item.status === 'Active' ? 'bg-[#2D6A4F]/10 text-[#2D6A4F] border-[#2D6A4F]/20' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>{item.status}</span>
                        </div>
                        <h3 className="font-black text-base text-[#1A1615] mb-2">{item.name}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200 mt-4">
                        <span className="text-[#D4A24C] font-black text-xs flex items-center gap-1.5"><Star size={14} fill="#D4A24C" /> {item.points} Pts</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingMenuItem(item);
                              setMenuForm({
                                id: item.id,
                                name: item.name,
                                category: item.category,
                                price: item.price.toString(),
                                badge: item.badge || '',
                                points: item.points.toString(),
                                desc: item.desc || '',
                                image: item.image || '',
                                status: item.status || 'Active'
                              });
                              setIsAddingMenuItem(true);
                            }} 
                            className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 border border-gray-200"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => {
                              setMenuItems(prev => prev.filter(m => m.id !== item.id)); 
                              showToast("Menu berhasil dihapus!");
                            }} 
                            className="p-2.5 bg-red-50 hover:bg-red-100 rounded-xl text-red-500 border border-red-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminTab === 'vouchers' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Manajemen Voucher Loyalitas</h1>
                  <p className="text-xs text-gray-500 font-medium font-sans">Konfigurasikan diskon yang dapat ditukarkan pelanggan menggunakan poin.</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingVoucher(null);
                    setVoucherForm({ id: '', title: '', code: '', pointsCost: '', type: 'percent', discountValue: '', desc: '', status: 'Active' });
                    setIsAddingVoucher(true);
                  }}
                  className="bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <Plus size={16} /> Tambah Voucher
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vouchers.map(v => (
                  <div key={v.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1 rounded-lg font-black uppercase tracking-wider">
                          Type: {v.type}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${v.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                          {v.status}
                        </span>
                      </div>
                      <h3 className="font-black text-lg text-gray-900 text-left">{v.title}</h3>
                      <p className="text-xs text-[#C96A3D] font-mono mt-1 text-left">Kode: {v.code} • Tukar: {v.pointsCost} Poin</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed text-left">{v.desc}</p>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-dashed border-gray-100">
                      <span className="font-black text-sm text-[#2D6A4F]">
                        {v.type === 'percent' ? `Diskon ${v.discountValue}%` : `Diskon Rp ${v.discountValue.toLocaleString('id-ID')}`}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingVoucher(v);
                            setVoucherForm({
                              id: v.id,
                              title: v.title,
                              code: v.code,
                              pointsCost: v.pointsCost.toString(),
                              type: v.type,
                              discountValue: v.discountValue.toString(),
                              desc: v.desc,
                              status: v.status
                            });
                            setIsAddingVoucher(true);
                          }}
                          className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 border"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            setVouchers(prev => prev.filter(x => x.id !== v.id));
                            showToast("Voucher dihapus!");
                          }}
                          className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 border border-red-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminTab === 'tables' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-200">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Manajemen Meja & QR Code Asli</h1>
                  <p className="text-xs text-gray-500 font-medium font-sans">Sistem menghasilkan QR Code unik berakurasi tinggi yang terhubung langsung ke browser HP pelanggan.</p>
                </div>
                <button onClick={() => setIsAddingTable(true)} className="bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95"><Plus size={16}/> Tambah Meja</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tables.map(tbl => {
                  const tableDirectURL = `${window.location.origin}${window.location.pathname}?table=${tbl.id}&role=customer`;
                  const qrCodeAPIUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=1a1615&bgcolor=ffffff&data=${encodeURIComponent(tableDirectURL)}`;
                  
                  return (
                    <div key={tbl.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between items-center text-center gap-5 hover:shadow-lg transition-all">
                      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-inner relative group">
                        <img 
                          src={qrCodeAPIUrl} 
                          alt={`QR Meja ${tbl.id}`} 
                          className="w-44 h-44 object-contain rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl p-4">
                          <p className="text-white text-[9px] font-semibold leading-relaxed font-mono break-all">{tableDirectURL}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-widest font-black text-[#C96A3D] bg-[#C96A3D]/10 px-3 py-1 rounded-full">Meja Dine-In</span>
                        <h4 className="font-black text-xl text-gray-900 mt-2">Meja M-{tbl.id}</h4>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Kapasitas: {tbl.capacity} Orang</p>
                      </div>

                      <div className="w-full flex gap-2">
                        <button 
                          onClick={() => {
                            const printWindow = window.open('', '_blank');
                            printWindow.document.write(`
                              <html>
                                <head>
                                  <title>Cetak QR Code Meja M-${tbl.id}</title>
                                  <style>
                                    body { font-family: sans-serif; text-align: center; background: #fff; color: #000; padding: 40px; }
                                    .card { border: 4px solid #1a1615; padding: 30px; max-width: 320px; margin: 0 auto; border-radius: 20px; }
                                    h1 { font-size: 28px; margin-bottom: 5px; }
                                    p { font-size: 14px; color: #666; margin-top: 0; }
                                    .qr-img { width: 220px; height: 220px; margin: 20px 0; }
                                    .footer { font-size: 10px; color: #aaa; margin-top: 15px; font-weight: bold; letter-spacing: 1px; }
                                  </style>
                                </head>
                                <body onload="window.print()">
                                  <div class="card">
                                    <h1>Meja M-${tbl.id}</h1>
                                    <p>${settings.shopName}</p>
                                    <img class="qr-img" src="${qrCodeAPIUrl}" />
                                    <p class="footer">PINDAI MEJA UNTUK MEMESAN</p>
                                  </div>
                                </body>
                              </html>
                            `);
                            printWindow.document.close();
                          }}
                          className="flex-1 bg-[#1A1615] hover:bg-[#2C2523] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                          <Printer size={14}/> Cetak QR
                        </button>
                        <button 
                          onClick={() => showToast(`Desain QR Code Meja M-${tbl.id} siap diunduh!`)}
                          className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl border border-gray-200"
                        >
                          <Download size={14}/>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {adminTab === 'customers' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="pb-6 border-b border-gray-200">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Database Member Terdaftar</h1>
                <p className="text-xs text-gray-500 font-medium font-sans">Kelola profil loyalty member, berikan hadiah poin instan, dan pantau pengeluaran belanja.</p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-gray-50 text-gray-400 uppercase tracking-widest font-black text-[10px]">
                      <tr>
                        <th className="p-5">ID Member</th>
                        <th className="p-5">Nama</th>
                        <th className="p-5">No HP WhatsApp</th>
                        <th className="p-5">Loyalty Level</th>
                        <th className="p-5">Poin</th>
                        <th className="p-5">Total Belanja</th>
                        <th className="p-5 text-center">Kelola Poin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                      {customers.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-5 font-mono text-[#1A1615] font-black">{c.id}</td>
                          <td className="p-5 text-[#1A1615] font-bold">{c.name}</td>
                          <td className="p-5 font-mono text-gray-500">{c.phone}</td>
                          <td className="p-5">
                            <span className="bg-[#D4A24C]/10 text-[#C96A3D] px-2.5 py-1 rounded-md text-[10px] font-black">
                              {c.level}
                            </span>
                          </td>
                          <td className="p-5 text-[#2D6A4F] font-black font-mono">{c.points} Pts</td>
                          <td className="p-5 font-mono">Rp {c.spend.toLocaleString('id-ID')}</td>
                          <td className="p-5 text-center">
                            {editingMember === c.id ? (
                              <div className="flex items-center justify-center gap-1.5 animate-in slide-in-from-right-2">
                                <input 
                                  type="number" 
                                  placeholder="+/- Poin" 
                                  value={memberPointsDelta}
                                  onChange={e => setMemberPointsDelta(e.target.value)}
                                  className="w-20 bg-gray-50 border rounded p-1 text-center font-mono text-xs text-[#1A1615]"
                                />
                                <button onClick={() => giftMemberPoints(c.id)} className="bg-emerald-600 text-white p-1.5 rounded"><Check size={12}/></button>
                                <button onClick={() => setEditingMember(null)} className="bg-gray-200 text-gray-600 p-1.5 rounded"><X size={12}/></button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => {
                                  setEditingMember(c.id);
                                  setMemberPointsDelta('');
                                }}
                                className="bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider"
                              >
                                Edit Poin
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'feedback' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="pb-6 border-b border-gray-200">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Feedback & Ulasan</h1>
                <p className="text-xs text-gray-500 font-medium font-sans">Pantau kepuasan masakan dan ulasan sanger espresso yang dikirim langsung oleh pelanggan.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedbacks.map(f => (
                  <div key={f.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow relative">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-black text-xs text-[#1A1615] flex items-center gap-1.5"><User size={14}/> {f.customerName}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{f.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#D4A24C] mb-3">
                        {[1,2,3,4,5].map(st => <Star key={st} size={14} fill={st <= f.rating ? "#D4A24C" : "none"} className={st <= f.rating ? "text-[#D4A24C]" : "text-gray-300"}/>)}
                      </div>
                      <p className="text-xs text-gray-600 italic font-medium leading-relaxed">"{f.comment}"</p>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-4 pt-3 border-t border-dashed border-gray-100 flex justify-between items-center">
                      <span>Menu: <strong className="text-gray-700">{f.menuName}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Konfigurasi & Identitas Brand</h1>
                <p className="text-xs text-gray-500 font-medium font-sans">Sesuaikan logo brand, persentase pajak warkop, sandi WiFi, hingga warna aksen sistem SaaS.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <div className="space-y-4">
                  <h3 className="font-black text-sm uppercase tracking-wider text-[#1A1615] flex items-center gap-2 pb-2 border-b">
                    <Store size={18} className="text-[#C96A3D]"/> Profil Warkop / Merchant
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nama Toko</label>
                      <input type="text" value={settings.shopName} onChange={e => setSettings({...settings, shopName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Alamat Fisik</label>
                      <input type="text" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Brand Tagline</label>
                      <input type="text" value={settings.brandTagline} onChange={e => setSettings({...settings, brandTagline: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Logo URL Preset</label>
                      <input type="text" value={settings.brandLogo} onChange={e => setSettings({...settings, brandLogo: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none font-bold" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-dashed">
                  <h3 className="font-black text-sm uppercase tracking-wider text-[#1A1615] flex items-center gap-2 pb-2 border-b">
                    <Coffee size={18} className="text-[#2D6A4F]"/> Sinyal WiFi & Sistem Koin
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">SSID WiFi</label>
                      <input type="text" value={settings.wifiName} onChange={e => setSettings({...settings, wifiName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sandi WiFi</label>
                      <input type="text" value={settings.wifiPass} onChange={e => setSettings({...settings, wifiPass: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Persentase Pajak (%)</label>
                      <input type="number" value={settings.taxPercentage} onChange={e => setSettings({...settings, taxPercentage: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Aksen Warna Tema SaaS</label>
                      <select value={settings.themeColor} onChange={e => setSettings({...settings, themeColor: e.target.value})} className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl p-3 text-xs outline-none font-bold">
                        <option value="amber">Default Amber Coffee</option>
                        <option value="emerald">Emerald Herbal</option>
                        <option value="indigo">Royal Indigo</option>
                        <option value="rose">Lively Rose</option>
                        <option value="violet">Violet Velvet</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed flex justify-end">
                  <button onClick={() => showToast("Seluruh pengaturan berhasil di-sync!")} className="bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#FDF8F5] min-h-screen font-sans antialiased selection:bg-[#D4A24C] selection:text-[#1A1615]">
      {/* SaaS CONTROL BAR */}
      <div className="sticky top-0 z-50 bg-[#1A1615] text-white border-b border-gray-800 px-5 py-3 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 flex items-center justify-center bg-white rounded-lg p-1.5 shrink-0">
            <Coffee size={24} className="text-[#1A1615]" />
          </div>
          <div className="w-px h-8 bg-gray-700 hidden md:block"></div>
          <div className="text-left">
            <h2 className="text-[10px] font-black tracking-widest text-[#D4A24C] uppercase mb-0.5">SaaS Portal Mode</h2>
            <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Simulasi Multi-Role</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 bg-[#2C2523] p-1.5 rounded-xl border border-gray-800 justify-center shadow-inner">
          <button onClick={() => { setCurrentRole('customer'); setCustomerView('landing_tenant'); }} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${currentRole === 'customer' ? 'bg-[#D4A24C] text-[#1A1615] shadow-md' : 'text-gray-400 hover:text-white'}`}><User size={14}/> Pelanggan</button>
          <button onClick={() => setCurrentRole('kitchen')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 relative ${currentRole === 'kitchen' ? 'bg-[#D4A24C] text-[#1A1615] shadow-md' : 'text-gray-400 hover:text-white'}`}>
            <ChefHat size={14}/> Dapur
            {globalOrders.filter(o => o.status === 'pending').length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-md animate-pulse shadow-sm border border-red-600">{globalOrders.filter(o => o.status === 'pending').length}</span>}
          </button>
          <button onClick={() => setCurrentRole('cashier')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 relative ${currentRole === 'cashier' ? 'bg-[#D4A24C] text-[#1A1615] shadow-md' : 'text-gray-400 hover:text-white'}`}>
            <Banknote size={14}/> Kasir
            {globalOrders.filter(o => o.paymentStatus === 'unpaid').length > 0 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-md shadow-sm border border-blue-600">{globalOrders.filter(o => o.paymentStatus === 'unpaid').length}</span>}
          </button>
          <button onClick={() => setCurrentRole('admin')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${currentRole === 'admin' ? 'bg-[#D4A24C] text-[#1A1615] shadow-md' : 'text-gray-400 hover:text-white'}`}><Shield size={14}/> Owner</button>
        </div>
      </div>

      {toast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#1A1615] text-[#D4A24C] border border-[#D4A24C]/40 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-[0_10px_40px_rgba(212,162,76,0.3)] flex items-center gap-3 animate-in slide-in-from-top-4">
          <Bell size={16} className="animate-bounce text-[#C96A3D]" /> {toast}
        </div>
      )}

      {/* DISPATCHER */}
      <div>
        {currentRole === 'customer' && (
          <div className="w-full animate-in fade-in">
            {customerView === 'landing_tenant' && renderLandingPage()}
            {customerView === 'tenant_profile' && renderTenantProfile()}
            {customerView === 'scan_qr' && renderScanQR()}
            {customerView === 'reservation_table' && renderReservationTable()}
            {customerView === 'menu' && renderMenu()}
            {customerView === 'cart' && renderCart()}
            {customerView === 'status' && renderStatus()}
            {customerView === 'history' && renderHistory()}
          </div>
        )}

        {currentRole === 'kitchen' && (authenticatedRoles.kitchen ? renderKitchen() : 
          <div className="flex h-[85vh] items-center justify-center bg-gradient-to-b from-[#1E1917] to-[#120E0D]">
            <form onSubmit={handleRoleLogin} className="bg-[#1A1615] border border-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-left">
              <div className="w-16 h-16 bg-[#2C2523] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <ChefHat className="text-[#D4A24C]" size={32}/>
              </div>
              <h2 className="text-xl font-black text-white text-center mb-6">Login Staff Dapur</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Nama Pengguna (Username)</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-3 text-gray-500" />
                    <input 
                      type="text" 
                      required 
                      value={loginForm.username} 
                      onChange={e => setLoginForm({...loginForm, username: e.target.value})} 
                      className="w-full bg-[#2C2523] border border-gray-700 focus:border-[#D4A24C] text-white p-3 pl-10 rounded-xl outline-none text-xs font-semibold"
                      placeholder="Username (Demo: kitchen)" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Kata Sandi (Password)</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-3 text-gray-500" />
                    <input 
                      type="password" 
                      required 
                      value={loginForm.password} 
                      onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                      className="w-full bg-[#2C2523] border border-gray-700 focus:border-[#D4A24C] text-white p-3 pl-10 rounded-xl outline-none text-xs font-semibold"
                      placeholder="Password (Demo: 123)" 
                    />
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#D4A24C] text-[#1A1615] py-3.5 rounded-xl font-black uppercase tracking-wider text-xs">
                Akses Masuk
              </button>
            </form>
          </div>
        )}

        {currentRole === 'cashier' && (authenticatedRoles.cashier ? renderCashier() : 
          <div className="flex h-[85vh] items-center justify-center bg-gradient-to-b from-[#1E1917] to-[#120E0D]">
            <form onSubmit={handleRoleLogin} className="bg-[#1A1615] border border-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-left">
              <div className="w-16 h-16 bg-[#2C2523] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Banknote className="text-[#D4A24C]" size={32}/>
              </div>
              <h2 className="text-xl font-black text-white text-center mb-6">Login POS Kasir</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Nama Pengguna (Username)</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-3 text-gray-500" />
                    <input 
                      type="text" 
                      required 
                      value={loginForm.username} 
                      onChange={e => setLoginForm({...loginForm, username: e.target.value})} 
                      className="w-full bg-[#2C2523] border border-gray-700 focus:border-[#D4A24C] text-white p-3 pl-10 rounded-xl outline-none text-xs font-semibold"
                      placeholder="Username (Demo: cashier)" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Kata Sandi (Password)</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-3 text-gray-500" />
                    <input 
                      type="password" 
                      required 
                      value={loginForm.password} 
                      onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                      className="w-full bg-[#2C2523] border border-gray-700 focus:border-[#D4A24C] text-white p-3 pl-10 rounded-xl outline-none text-xs font-semibold"
                      placeholder="Password (Demo: 123)" 
                    />
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#D4A24C] text-[#1A1615] py-3.5 rounded-xl font-black uppercase tracking-wider text-xs">
                Akses Masuk
              </button>
            </form>
          </div>
        )}

        {currentRole === 'admin' && (authenticatedRoles.admin ? renderAdminView() : 
          <div className="flex h-[85vh] items-center justify-center bg-gradient-to-b from-[#1E1917] to-[#120E0D]">
            <form onSubmit={handleRoleLogin} className="bg-[#1A1615] border border-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-left">
              <div className="w-16 h-16 bg-[#2C2523] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="text-[#D4A24C]" size={32}/>
              </div>
              <h2 className="text-xl font-black text-white text-center mb-6">Login Owner</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Nama Pengguna (Username)</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-3 text-gray-500" />
                    <input 
                      type="text" 
                      required 
                      value={loginForm.username} 
                      onChange={e => setLoginForm({...loginForm, username: e.target.value})} 
                      className="w-full bg-[#2C2523] border border-gray-700 focus:border-[#D4A24C] text-white p-3 pl-10 rounded-xl outline-none text-xs font-semibold"
                      placeholder="Username (Demo: admin)" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Kata Sandi (Password)</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-3 text-gray-500" />
                    <input 
                      type="password" 
                      required 
                      value={loginForm.password} 
                      onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                      className="w-full bg-[#2C2523] border border-gray-700 focus:border-[#D4A24C] text-white p-3 pl-10 rounded-xl outline-none text-xs font-semibold"
                      placeholder="Password (Demo: 123)" 
                    />
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#D4A24C] text-[#1A1615] py-3.5 rounded-xl font-black uppercase tracking-wider text-xs">
                Akses Masuk
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ALL MODALS */}
      {isAddingMenuItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-[#1A1615] relative shadow-2xl text-left">
            <button 
              onClick={() => {
                setIsAddingMenuItem(false);
                setEditingMenuItem(null);
              }} 
              className="absolute right-5 top-5 text-gray-400 hover:text-black bg-gray-50 p-1.5 rounded-full"
            >
              <X size={18} />
            </button>
            <h3 className="font-black text-xl mb-6">{editingMenuItem ? "Edit Menu Warkop" : "Daftar Menu Baru"}</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingMenuItem) {
                setMenuItems(prev => prev.map(m => m.id === editingMenuItem.id ? {
                  ...m,
                  name: menuForm.name,
                  category: menuForm.category,
                  price: parseFloat(menuForm.price),
                  badge: menuForm.badge,
                  points: parseInt(menuForm.points),
                  desc: menuForm.desc,
                  image: menuForm.image,
                  status: menuForm.status
                } : m));
                showToast("Menu berhasil diperbarui!");
              } else {
                const newItem = {
                  id: Date.now(),
                  name: menuForm.name,
                  category: menuForm.category,
                  price: parseFloat(menuForm.price),
                  badge: menuForm.badge,
                  points: parseInt(menuForm.points),
                  desc: menuForm.desc,
                  image: menuForm.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=300',
                  status: menuForm.status
                };
                setMenuItems(prev => [...prev, newItem]);
                showToast("Menu baru ditambahkan!");
              }
              setIsAddingMenuItem(false);
              setEditingMenuItem(null);
            }} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Nama Menu</label>
                <input type="text" required value={menuForm.name} onChange={e => setMenuForm({...menuForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Kategori</label>
                  <select value={menuForm.category} onChange={e => setMenuForm({...menuForm, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none">
                    <option value="Coffee">Coffee</option>
                    <option value="Food">Food</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Harga (Rp)</label>
                  <input type="number" required value={menuForm.price} onChange={e => setMenuForm({...menuForm, price: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Poin Reward</label>
                  <input type="number" required value={menuForm.points} onChange={e => setMenuForm({...menuForm, points: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Status Ketersediaan</label>
                  <select value={menuForm.status} onChange={e => setMenuForm({...menuForm, status: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Gambar URL</label>
                <input type="text" value={menuForm.image} onChange={e => setMenuForm({...menuForm, image: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none" placeholder="https://..." />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Deskripsi Hidangan</label>
                <textarea value={menuForm.desc} onChange={e => setMenuForm({...menuForm, desc: e.target.value})} rows="2" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#1A1615] text-[#D4A24C] py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow">
                {editingMenuItem ? "Simpan Perubahan" : "Tambahkan Menu"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddingVoucher && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-[#1A1615] relative shadow-2xl text-left animate-in slide-in-from-bottom-4">
            <button onClick={() => { setIsAddingVoucher(false); setEditingVoucher(null); }} className="absolute right-5 top-5 text-gray-400 hover:text-black bg-gray-50 p-1.5 rounded-full"><X size={18} /></button>
            <h3 className="font-black text-xl mb-6">{editingVoucher ? "Edit Voucher Loyalitas" : "Daftar Voucher Baru"}</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingVoucher) {
                setVouchers(prev => prev.map(v => v.id === editingVoucher.id ? {
                  ...v,
                  title: voucherForm.title,
                  code: voucherForm.code,
                  pointsCost: parseInt(voucherForm.pointsCost),
                  type: voucherForm.type,
                  discountValue: parseFloat(voucherForm.discountValue),
                  desc: voucherForm.desc,
                  status: voucherForm.status
                } : v));
                showToast("Voucher berhasil diperbarui!");
              } else {
                const newV = {
                  id: Date.now(),
                  title: voucherForm.title,
                  code: voucherForm.code,
                  pointsCost: parseInt(voucherForm.pointsCost),
                  type: voucherForm.type,
                  discountValue: parseFloat(voucherForm.discountValue),
                  desc: voucherForm.desc,
                  status: voucherForm.status
                };
                setVouchers(prev => [...prev, newV]);
                showToast("Voucher baru ditambahkan!");
              }
              setIsAddingVoucher(false);
              setEditingVoucher(null);
            }} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Judul Voucher</label>
                <input type="text" required value={voucherForm.title} onChange={e => setVoucherForm({...voucherForm, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Kode Unik</label>
                  <input type="text" required value={voucherForm.code} onChange={e => setVoucherForm({...voucherForm, code: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Poin Dibutuhkan</label>
                  <input type="number" required value={voucherForm.pointsCost} onChange={e => setVoucherForm({...voucherForm, pointsCost: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Jenis Diskon</label>
                  <select value={voucherForm.type} onChange={e => setVoucherForm({...voucherForm, type: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none">
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Cash (Rp)</option>
                    <option value="free_item">Free Item</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Nilai Diskon</label>
                  <input type="number" required value={voucherForm.discountValue} onChange={e => setVoucherForm({...voucherForm, discountValue: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Status Ketersediaan</label>
                  <select value={voucherForm.status} onChange={e => setVoucherForm({...voucherForm, status: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Deskripsi Aturan Voucher</label>
                <textarea value={voucherForm.desc} onChange={e => setVoucherForm({...voucherForm, desc: e.target.value})} rows="2" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#1A1615] text-[#D4A24C] py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow">
                {editingVoucher ? "Simpan Perubahan" : "Terbitkan Voucher"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddingTable && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-[#1A1615] relative shadow-2xl text-left">
            <button onClick={() => setIsAddingTable(false)} className="absolute right-5 top-5 text-gray-400 hover:text-black bg-gray-50 p-1.5 rounded-full"><X size={18} /></button>
            <div className="w-12 h-12 bg-[#D4A24C]/20 text-[#C96A3D] rounded-xl flex items-center justify-center mb-4"><QrCode size={24}/></div>
            <h3 className="font-black text-xl mb-6">Daftar Meja Baru</h3>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              if(tables.some(t => t.id === newTableId)){
                showToast("Meja sudah ada!");
                return;
              } 
              setTables([...tables, {id: newTableId, status: 'available', capacity: parseInt(newTableCapacity)}]); 
              setIsAddingTable(false); 
              setNewTableId('');
              setNewTableCapacity('4');
              showToast("Meja ditambahkan!"); 
            }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nomor Meja</label>
                <input type="text" value={newTableId} onChange={(e) => setNewTableId(e.target.value)} required placeholder="Contoh: 09" className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl py-3 px-4 text-sm font-bold outline-none animate-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Kapasitas Tempat Duduk (Orang)</label>
                <input type="number" value={newTableCapacity} onChange={(e) => setNewTableCapacity(e.target.value)} required className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4A24C] rounded-xl py-3 px-4 text-sm font-bold outline-none" />
              </div>
              <button type="submit" className="w-full bg-[#1A1615] hover:bg-[#2C2523] text-[#D4A24C] py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg">Tambahkan Meja</button>
            </form>
          </div>
        </div>
      )}

      {activeReceipt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl max-w-sm w-full p-8 text-[#1A1615] relative shadow-2xl font-mono text-xs border-t-8 border-[#1A1615]">
            <button onClick={() => setActiveReceipt(null)} className="absolute right-4 top-4 text-gray-400 hover:text-black"><X size={20} /></button>
            <div className="text-center pb-5 border-b-2 border-dashed border-gray-200">
              <h3 className="font-black text-lg uppercase tracking-widest mb-1">{settings.shopName}</h3>
              <p className="text-[10px] text-gray-500 font-sans">{settings.address}</p>
              <p className="text-[10px] text-gray-500 mt-2">Waktu: {activeReceipt.date} • Meja M-{activeReceipt.tableName}</p>
            </div>
            <div className="py-5 space-y-4 font-semibold text-gray-700">
              <div className="flex justify-between"><span>ID NOTA:</span><span className="font-black text-[#1A1615]">{activeReceipt.orderId}</span></div>
              <div className="flex justify-between"><span>NAMA:</span><span className="font-black text-[#1A1615] uppercase">{activeReceipt.customerName}</span></div>
              <div className="flex justify-between"><span>METODE:</span><span className="font-black text-[#1A1615] uppercase">{activeReceipt.paymentMethod || 'TUNAI'}</span></div>
              
              <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-3">
                {activeReceipt.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.qty}x {item.name}</span>
                    <span>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-2">
                {activeReceipt.discountAmount > 0 && (
                  <div className="flex justify-between text-[#C96A3D]">
                    <span>DISKON VOUCHER:</span><span>- Rp {activeReceipt.discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>PAJAK ({settings.taxPercentage}%):</span><span>Rp {(activeReceipt.total * (settings.taxPercentage / (100 + settings.taxPercentage))).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-[#1A1615] pt-1">
                  <span>TOTAL LUNAS:</span><span>Rp {activeReceipt.total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
            <div className="text-center pt-5 border-t-2 border-dashed border-gray-200">
              <p className="font-black text-[#2D6A4F] text-lg uppercase tracking-widest border-2 border-[#2D6A4F] inline-block px-4 py-1 rounded-lg transform -rotate-3 mt-2">L U N A S</p>
              <p className="text-[9px] text-gray-400 mt-4 font-sans font-bold">Terima Kasih Telah Berkunjung</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
