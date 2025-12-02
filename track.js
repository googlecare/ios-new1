(async function silentFingerprint() {

  const info = {};

  // Basic browser/device information
  info.userAgent = navigator.userAgent;
  info.platform = navigator.platform;
  info.languages = navigator.languages;
  info.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  info.hardwareConcurrency = navigator.hardwareConcurrency;
  info.deviceMemory = navigator.deviceMemory || null;
  info.screen = {
    width: screen.width,
    height: screen.height,
    colorDepth: screen.colorDepth
  };
  info.viewport = {
    width: innerWidth,
    height: innerHeight
  };

  // Network info (silent)
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    info.connection = {
      effectiveType: conn.effectiveType,
      downlink: conn.downlink,
      rtt: conn.rtt,
      saveData: conn.saveData
    };
  }

  // Battery (if supported)
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();
    info.battery = {
      level: battery.level,
      charging: battery.charging
    };
  }

  // Silent IP + ISP + approximate location
  // ipapi.co requires NO key and NO permission for IP-based location
  try {
    const resp = await fetch("https://ipapi.co/json/");
    const data = await resp.json();

    info.ip = data.ip;
    info.city = data.city;
    info.region = data.region;
    info.country = data.country_name;
    info.latitude = data.latitude;
    info.longitude = data.longitude;
    info.org = data.org;
    info.asn = data.asn;
  } catch (err) {
    info.ip = "Error fetching IP";
  }

  console.group("%cSilent Data Collected", "color: #0af; font-weight: bold;");
  console.log(info);
  console.groupEnd();

})();