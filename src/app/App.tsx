import React, { useState, useEffect, useRef } from 'react';
import { Phone, Shield, Users, Clock, Award, TrendingUp, MapPin, Star, ChevronDown, Menu, X, MessageCircle, Calendar, Facebook, Linkedin, Instagram, FileText, ChevronRight } from 'lucide-react';
import { motion, useInView, useAnimation } from 'motion/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}+</span>;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<'A' | 'B'>('A');
  const [callPopupOpen, setCallPopupOpen] = useState(false);

  const PHONE_DISPLAY = '+48 22 123 45 67';
  const PHONE_TEL = '+48221234567';

  useEffect(() => {
    if (!callPopupOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCallPopupOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [callPopupOpen]);

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const partnerSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Shield className="h-10 w-10 text-blue-900" />
              <span className="ml-2 text-xl font-semibold text-blue-900">Ubezpieczenia Cichy</span>
            </div>


            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Dla Ciebie i Rodziny */}
              {/* <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown('family')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-900 transition-colors">
                  <span>Dla Ciebie i Rodziny</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === 'family' && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white shadow-xl rounded-lg p-6 border border-gray-100">
                    <div className="grid gap-4">
                      <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <h3 className="font-semibold text-blue-900 mb-2">Majątek</h3>
                        <p className="text-sm text-gray-600">Ochrona Twojego domu i mienia</p>
                      </div>
                      <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <h3 className="font-semibold text-blue-900 mb-2">Podróże</h3>
                        <p className="text-sm text-gray-600">Bezpieczne podróże po całym świecie</p>
                      </div>
                      <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <h3 className="font-semibold text-blue-900 mb-2">OC</h3>
                        <p className="text-sm text-gray-600">Ubezpieczenia pojazdów i AC</p>
                      </div>
                    </div>
                  </div>
                )}
              </div> */}

              {/* Dla Firm i Pracowników */}
              {/* <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown('business')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-900 transition-colors">
                  <span>Dla Firm i Pracowników</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === 'business' && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white shadow-xl rounded-lg p-6 border border-gray-100">
                    <div className="grid gap-4">
                      <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <h3 className="font-semibold text-blue-900 mb-2">Ubezpieczenia firmowe</h3>
                        <p className="text-sm text-gray-600">Kompleksowa ochrona dla Twojej firmy</p>
                      </div>
                      <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <h3 className="font-semibold text-blue-900 mb-2">Pracownicy</h3>
                        <p className="text-sm text-gray-600">Grupowe ubezpieczenia dla zespołu</p>
                      </div>
                      <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <h3 className="font-semibold text-blue-900 mb-2">OC działalności</h3>
                        <p className="text-sm text-gray-600">Ochrona odpowiedzialności zawodowej</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors">
                Pomoc i Kontakt
              </a> */}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <button
                type="button"
                onClick={() => setCallPopupOpen(true)}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Zadzwoń teraz</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 space-y-4">
              <div>
                <button className="font-semibold text-blue-900 mb-2">Dla Ciebie i Rodziny</button>
                <div className="pl-4 space-y-2">
                  <p className="text-sm text-gray-600">Majątek</p>
                  <p className="text-sm text-gray-600">Podróże</p>
                  <p className="text-sm text-gray-600">OC</p>
                </div>
              </div>
              <div>
                <button className="font-semibold text-blue-900 mb-2">Dla Firm i Pracowników</button>
                <div className="pl-4 space-y-2">
                  <p className="text-sm text-gray-600">Ubezpieczenia firmowe</p>
                  <p className="text-sm text-gray-600">Pracownicy</p>
                  <p className="text-sm text-gray-600">OC działalności</p>
                </div>
              </div>
              <a href="#contact" className="block text-gray-700">Pomoc i Kontakt</a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCallPopupOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg"
              >
                <Phone className="h-5 w-5" />
                <span>Zadzwoń teraz</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {callPopupOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Zadzwoń teraz"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setCallPopupOpen(false)}
            aria-label="Zamknij"
          />
          <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div className="font-semibold text-blue-900">Zadzwoń teraz</div>
              <button
                type="button"
                onClick={() => setCallPopupOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Zamknij"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="px-5 py-5">
              <p className="text-gray-600 mb-4">
                Najszybciej pomożemy Ci telefonicznie. Zadzwoń na:
              </p>
              <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="text-lg font-semibold text-blue-900">{PHONE_DISPLAY}</div>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Zadzwoń
                </a>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCallPopupOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1767411354923-b22cb2e02ea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMGhvbWUlMjBpbnN1cmFuY2V8ZW58MXx8fHwxNzcyMjc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl text-white mb-6"
          >
            Twoje bezpieczeństwo, nasza misja
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Kompleksowe ubezpieczenia dla Ciebie, Twojej rodziny i firmy
          </motion.p>
          {/* <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-emerald-700 transition-colors shadow-lg"
          >
            Sprawdź ofertę ubezpieczeniową
          </motion.button> */}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl text-blue-900 mb-2">
                <AnimatedCounter end={15} />
              </div>
              <p className="text-gray-600">lat na rynku</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-blue-900 mb-2">
                <AnimatedCounter end={5000} />
              </div>
              <p className="text-gray-600">zadowolonych klientów</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-blue-900 mb-2">
                <AnimatedCounter end={25} />
              </div>
              <p className="text-gray-600">lat doświadczenia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-gray-600 mb-8">Współpracujemy z najlepszymi</h2>
          <Slider {...partnerSettings}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="px-4">
                <div className="h-20 flex items-center justify-center bg-gray-100 rounded-lg grayscale hover:grayscale-0 transition-all">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1769952948855-da716b176109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBjb21wYW55JTIwbG9nbyUyMGJyYW5kfGVufDF8fHx8MTc3MjI3NzQyMHww&ixlib=rb-4.1.0&q=80&w=1080&sig=${index}`}
                    alt={`Partner ${index + 1}`}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section> */}

      {/* About Us Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1589639293663-f9399bb41721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnN1cmFuY2UlMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc3MjI3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Nasz zespół"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl text-blue-900 mb-6">O nas</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Od ponad 15 lat pomagamy klientom w zabezpieczeniu ich przyszłości. Jesteśmy zespołem doświadczonych
                specjalistów, którzy łączą wiedzę branżową z indywidualnym podejściem do każdego klienta.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Naszą misją jest dostarczanie kompleksowych rozwiązań ubezpieczeniowych, które dają prawdziwe
                bezpieczeństwo i spokój ducha. Współpracujemy z najlepszymi towarzystwami ubezpieczeniowymi,
                aby zapewnić Państwu najwyższą jakość ochrony.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Wierzymy, że każdy klient zasługuje na profesjonalną obsługę i rozwiązania szyte na miarę.
                Dlatego zawsze stawiamy na transparentność, rzetelność i długoterminowe relacje.
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Value Propositions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center text-blue-900 mb-4">Dlaczego my?</h2>
          <p className="text-center text-gray-600 mb-12">Co nas wyróżnia na rynku</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 hover:shadow-xl rounded-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl text-blue-900 mb-3">Indywidualne podejście</h3>
              <p className="text-gray-600">
                Każdy klient jest dla nas wyjątkowy - dopasowujemy rozwiązania do Twoich potrzeb
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 hover:shadow-xl rounded-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl text-blue-900 mb-3">Troska o klienta</h3>
              <p className="text-gray-600">
                Zawsze jesteśmy przy Tobie - wspieramy na każdym etapie współpracy
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 hover:shadow-xl rounded-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl text-blue-900 mb-3">Kwalifikacje</h3>
              <p className="text-gray-600">
                Nasz zespół to certyfikowani eksperci z wieloletnim doświadczeniem
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 hover:shadow-xl rounded-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl text-blue-900 mb-3">Szybkość działania</h3>
              <p className="text-gray-600">
                Sprawna obsługa i ekspresowe rozpatrywanie wniosków
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center text-blue-900 mb-4">Nasze biura</h2>
          <p className="text-center text-gray-600 mb-12">Odwiedź nas osobiście</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-blue-900 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl text-blue-900 mb-2">Biuro Warszawa Centrum</h3>
                  <p className="text-gray-600">ul. Marszałkowska 115</p>
                  <p className="text-gray-600">00-102 Warszawa</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-4">
                <Clock className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-600">Poniedziałek - Piątek: 9:00 - 18:00</p>
                  <p className="text-gray-600">Sobota: 10:00 - 14:00</p>
                  <p className="text-gray-600">Niedziela: Zamknięte</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-emerald-600 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl text-blue-900 mb-2">Biuro Kraków Stare Miasto</h3>
                  <p className="text-gray-600">ul. Floriańska 45</p>
                  <p className="text-gray-600">31-019 Kraków</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-4">
                <Clock className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-600">Poniedziałek - Piątek: 9:00 - 18:00</p>
                  <p className="text-gray-600">Sobota: 10:00 - 14:00</p>
                  <p className="text-gray-600">Niedziela: Zamknięte</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center text-blue-900 mb-4">Co mówią nasi klienci</h2>
          <div className="flex justify-center items-center space-x-1 mb-12">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 text-gray-600">(4.9/5 na podstawie 1,234 opinii)</span>
          </div>
          <Slider {...testimonialSettings}>
            {[
              {
                name: 'Anna Kowalska',
                text: 'Profesjonalna obsługa i indywidualne podejście. Polecam każdemu!',
                rating: 5,
              },
              {
                name: 'Piotr Nowak',
                text: 'Dzięki SecureLife znalazłem idealne ubezpieczenie dla mojej firmy.',
                rating: 5,
              },
              {
                name: 'Maria Wiśniewska',
                text: 'Zawsze pomocni i kompetentni. Czuję się bezpiecznie z ich ochroną.',
                rating: 5,
              },
              {
                name: 'Jan Kowalczyk',
                text: 'Najlepsza agencja ubezpieczeniowa z jaką miałem do czynienia.',
                rating: 5,
              },
              {
                name: 'Ewa Zielińska',
                text: 'Szybka likwidacja szkody i sprawna komunikacja. Super!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-gray-50 p-6 rounded-lg h-64 flex flex-col">
                  <div className="flex space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow italic">"{testimonial.text}"</p>
                  <p className="text-blue-900 font-semibold">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center text-blue-900 mb-4">Najczęściej zadawane pytania</h2>
          <p className="text-center text-gray-600 mb-12">Odpowiedzi na najważniejsze pytania</p>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                Jak szybko mogę otrzymać polisę ubezpieczeniową?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                W większości przypadków polisę możesz otrzymać tego samego dnia. Po przesłaniu wszystkich
                wymaganych dokumentów, nasza szybka weryfikacja pozwala na ekspresowe wystawienie polisy
                w ciągu kilku godzin.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                Czy mogę zmienić zakres ubezpieczenia w trakcie trwania polisy?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Tak, możesz w każdej chwili rozszerzyć lub zawęzić zakres ubezpieczenia. Wystarczy
                skontaktować się z naszym biurem, a nasz agent pomoże Ci wprowadzić odpowiednie zmiany
                i przeliczyć składkę.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                Jakie dokumenty są potrzebne do zawarcia ubezpieczenia?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Zależy to od rodzaju ubezpieczenia. Podstawowo potrzebny jest dokument tożsamości oraz
                informacje o przedmiocie ubezpieczenia. Nasz agent dokładnie poinformuje Cię o wymaganych
                dokumentach podczas pierwszego kontaktu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                Jak długo trwa likwidacja szkody?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Standardowy czas rozpatrzenia roszczenia to 30 dni. W prostych przypadkach możliwe jest
                nawet szybsze rozpatrzenie. Zawsze informujemy klientów o postępach w sprawie i wspieramy
                w całym procesie likwidacji szkody.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-0 shadow-sm">
              <AccordionTrigger className="text-blue-900 hover:text-blue-700">
                Czy oferujecie ubezpieczenia dla firm?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Tak, mamy szeroką ofertę ubezpieczeń dla firm każdej wielkości. Oferujemy ubezpieczenia
                majątkowe, OC działalności gospodarczej, ubezpieczenia grupowe dla pracowników oraz wiele
                innych produktów dostosowanych do potrzeb biznesu.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section> */}

      {/* Footer */}
      <footer id="contact" className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8" />
                <span className="ml-2 text-xl font-semibold">Ubezpieczenia Cichy</span>
              </div>
              <p className="text-blue-100">
                Twój partner w zabezpieczeniu przyszłości
              </p>
            </div>

            {/* <div>
              <h3 className="font-semibold mb-4">Szybkie linki</h3>
              <ul className="space-y-2 text-blue-100">
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Polityka prywatności
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Regulamin
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Dokumenty do pobrania
                  </a>
                </li>
              </ul>
            </div> */}

            <div>
              <h3 className="font-semibold mb-4">Kontakt</h3>
              <ul className="space-y-2 text-blue-100">
                <li>Tel: {PHONE_DISPLAY}</li>
                <li>Email: kontakt@ubezpieczeniacichy.pl</li>
                <li>Godz. pracy: PN-PT 9:00-18:00</li>
              </ul>
            </div>

            {/* <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Zapisz się, aby otrzymywać najnowsze informacje i oferty specjalne
              </p>
              <input
                type="email"
                placeholder="Twój email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 mb-2"
              />
              <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Zapisz się
              </button>
            </div> */}
          </div>

          <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm mb-4 md:mb-0">
              © 2026 Ubezpieczenia Cichy. Wszelkie prawa zastrzeżone.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div> */}
          </div>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-110"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-2xl w-80 overflow-hidden"
          >
            <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">Potrzebujesz pomocy?</span>
              </div>
              <button onClick={() => setChatOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Nasz agent skontaktuje się z Tobą w ciągu 24 godzin
              </p>
              <input
                type="text"
                placeholder="Imię i nazwisko"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <input
                type="tel"
                placeholder="Telefon"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <textarea
                placeholder="Twoja wiadomość"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 resize-none"
              />
              <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Wyślij
              </button>
            </div>
          </motion.div>
        )}
      </div> */}

      {/* Calendar Integration Widget */}
      {/* <div className="fixed bottom-24 right-6 z-40">
        {!calendarOpen ? (
          <button
            onClick={() => setCalendarOpen(true)}
            className="bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-all hover:scale-110 flex items-center space-x-2"
          >
            <Calendar className="h-6 w-6" />
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-2xl w-80 overflow-hidden"
          >
            <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Umów spotkanie</span>
              </div>
              <button onClick={() => setCalendarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Wybierz biuro:</p>
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setSelectedOffice('A')}
                  className={`flex-1 py-2 rounded-lg transition-colors ${
                    selectedOffice === 'A'
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Warszawa
                </button>
                <button
                  onClick={() => setSelectedOffice('B')}
                  className={`flex-1 py-2 rounded-lg transition-colors ${
                    selectedOffice === 'B'
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Kraków
                </button>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">Wybierz datę i godzinę:</p>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                />
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>9:00 - 10:00</option>
                  <option>10:00 - 11:00</option>
                  <option>11:00 - 12:00</option>
                  <option>13:00 - 14:00</option>
                  <option>14:00 - 15:00</option>
                  <option>15:00 - 16:00</option>
                  <option>16:00 - 17:00</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Imię i nazwisko"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
              />
              <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
                Zarezerwuj spotkanie
              </button>
            </div>
          </motion.div>
        )}
      </div> */}
    </div>
  );
}

export default App;
