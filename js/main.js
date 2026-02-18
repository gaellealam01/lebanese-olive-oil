(function() {
  'use strict';

  var header = document.getElementById('header');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (header) {
    var onScroll = function() { header.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (navToggle && navLinks) {
    var close = function() { navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); navToggle.setAttribute('aria-label','Open menu'); };
    var open = function() { navLinks.classList.add('open'); navToggle.setAttribute('aria-expanded','true'); navToggle.setAttribute('aria-label','Close menu'); };
    navToggle.addEventListener('click', function() { navLinks.classList.contains('open') ? close() : open(); });
    navLinks.querySelectorAll('a').forEach(function(l) { l.addEventListener('click', close); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) close();
    });
  }

  var path = window.location.pathname.split('/').pop() || 'index.html';
  if (navLinks) navLinks.querySelectorAll('a').forEach(function(a) {
    var h = a.getAttribute('href');
    a.classList.toggle('active', h === path || (path === '' && h === 'index.html'));
  });

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if (els.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (en.isIntersecting) { en.target.classList.add('vis'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function(el) { obs.observe(el); });
  } else {
    els.forEach(function(el) { el.classList.add('vis'); });
  }
})();
