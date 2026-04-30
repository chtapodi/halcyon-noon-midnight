// ---- Localized strings for PebbleKit JS ----

var WEATHER_CODES = {
  0: ['CLEAR', 'DÉGAGÉ', 'KLAR', 'DESPEJADO', 'SERENO', 'HELDER', 'AÇIK', 'JASNO', 'LIMPO', 'ΑΙΘΡΙΟΣ', 'KLART', 'CZYSTO', 'JASNO', 'TRỜI QUANG', 'SENIN', 'CLAR', 'KLART', 'ЯСНО', 'SELGE', 'GARBI', 'SELKEÄÄ', 'KLART', 'GIEDRA', 'JASNO', 'TISZTA', 'VEDRO', 'GLAN', 'SKAIDRS', 'VEDRO', '晴朗', 'CERAH', 'ЯСНО', 'CLIR', 'CLARO', '快晴', '맑음', 'בהיר'],
  1: ['MOSTLY CLEAR', 'PLUTÔT DÉGAGÉ', 'MEIST KLAR', 'MAYORMENTE DESP.', 'QUASI SERENO', 'VRIJ HELDER', 'ÇOĞUNLUKLA AÇIK', 'SKORO JASNО', 'M.TO LIMPO', 'ΣΧΕΔΟΝ ΑΙΘΡΙΟΣ', 'MEST KLART', 'PRZEWAŻNIE CZYSTO', 'SKORO JASNО', 'QUANG MÂY', 'PREA SENIN', 'MAJORITÀ CLAR', 'MEST KLART', 'ПРЕИМ. ЯСНО', 'PEAMISELT SELGE', 'GEHIENBAT GARBI', 'MELKO SELKEÄÄ', 'MEST KLART', 'MAŽAITIKIMYBE', 'PRETEŽNO JASNO', 'RENSZINT TISZTA', 'PRETEŽNO VEDRO', 'PÁIRTEACH GLAN', 'GANDRĪZ SKAIDRS', 'PRETEŽNO VEDRO', '大部晴朗', 'CERAH BERAWAN', 'ПЕРЕВАЖНО ЯСНО', 'GAN EIRAF', 'MOI CLARO', 'おおむね晴れ', '대체로 맑음', 'בהיר לרוב'],
  2: ['PARTLY CLOUDY', 'PART. NUAGEUX', 'TEILW. BEWÖLKT', 'PARCIALMENTE NUB.', 'PARZ. NUVOLOSO', 'LICHT BEWÖLKT', 'PARÇALI BULUTLU', 'POLOJASNO', 'PARCIAL. NUBLADO', 'ΜΕΡΙΚΩΣ ΣΥΝΝΕΦΙΑΣΜΕΝΟΣ', 'HALVKLART', 'CZĘŚCIOWO ZACHMURZONE', 'POLOJASNO', 'CÓ MÂY', 'PARȚIAL NOROS', 'PARCIALMENT NUBOL', 'LETTESKYET', 'ПЕРЕМ. ОБЛАЧНОСТЬ', 'VAHELDUV PILVISUS', 'HODEI KERTSUAK', 'PUOLIPILVISTÄ', 'LETTESKYET', 'MAŽAITIKIMYBE', 'DELNO OBLAČNO', 'RÉSZLEGESEN FELHŐS', 'DJELOMIČNO OBLAČNO', 'PÁIRTEACH SCALTA', 'DAĻĒJI MĀKOŅAINS', 'DELIMIČNO OBLAČNO', '多云', 'BERAWAN SEBAGIAN', 'МІНЛИВА ХМАРНІСТЬ', 'RHANNOL GYMOGLOG', 'PARCIALMENTE NUBRADO', '晴れ時々曇り', '구름 조금', 'מעונן חלקית'],
  3: ['OVERCAST', 'COUVERT', 'STARK BEWÖLKT', 'NUBLADO', 'COPERTO', 'BEWÖLKT', 'KAPALI', 'ZATAŽENO', 'ENCOBERTO', 'ΝΕΦΕΛΩΔΗΣ', 'MUULIT', 'ZACHMURZONE', 'ZATIAHNUTÉ', 'NHIỀU MÂY', 'NOROS', 'COBERT', 'OVERSKYET', 'ПАСМУРНО', 'PILVINE', 'ESTALIA', 'PILVISTÄ', 'OVERSKYET', 'APSINIAUKĘ', 'OBLAČNO', 'BORULT', 'OBLAČNO', 'SCALTA', 'APMĀCIES', 'OBLAČNO', '阴天', 'MENDUNG', 'ПОХМУРО', 'CYMOGLOG', 'NUBRADO', '曇り', '흐림', 'מעונן'],
  45: ['FOGGY', 'BROUILLARD', 'NEBEL', 'NIEBLA', 'NEBBIA', 'MISTIG', 'SİSLİ', 'MLHA', 'NEVOEIRO', 'ΟΜΙΧΛΩΔΗΣ', 'DIMMA', 'MGLISTO', 'HMLA', 'SƯƠNG MÙ', 'CEAȚĂ', 'BOIRA', 'TÅKE', 'ТУМАН', 'UDUNE', 'LAINOA', 'USVAISTA', 'TÅGE', 'RŪKAS', 'MEGLA', 'KÖDÖS', 'MAGLA', 'CEOCH', 'MIGLAINS', 'MAGLA', '雾', 'BERKABUT', 'ТУМАН', 'NIWLOG', 'NÉBOA', '霧', '안개', 'ערפילי'],
  48: ['FOGGY', 'BROUILLARD', 'NEBEL', 'NIEBLA', 'NEBBIA', 'MISTIG', 'SİSLİ', 'MLHA', 'NEVOEIRO', 'ΟΜΙΧΛΩΔΗΣ', 'DIMMA', 'MGLISTO', 'HMLA', 'SƯƠNG MÙ', 'CEAȚĂ', 'BOIRA', 'TÅKE', 'ТУМАН', 'UDUNE', 'LAINOA', 'USVAISTA', 'TÅGE', 'RŪKAS', 'MEGLA', 'KÖDÖS', 'MAGLA', 'CEOCH', 'MIGLAINS', 'MAGLA', '雾', 'BERKABUT', 'ТУМАН', 'NIWLOG', 'NÉBOA', '霧', '안개', 'ערפילי'],
  51: ['DRIZZLE', 'BRUINE', 'NIESELREGEN', 'LLOVIZNA', 'PIOGGERELLA', 'MIEZEL', 'ÇİSELEME', 'MRHOLENÍ', 'CHUVISCO', 'ΨΙΧΑΛΑ', 'DUGGREGN', 'MŻAWKA', 'MRHOLENIE', 'MƯA PHÙN', 'BURNIȚĂ', 'BOREIM', 'DYNREGN', 'МОРОСЬ', 'UDUVÍHM', 'ZIRRIMINA', 'TIHKUSADETTA', 'STØVREGN', 'KDRENA', 'PRŠENJE', 'SZITÁLÁS', 'SIPENJE', 'DRUCHLÁK', 'SMRIDZINĀŠANA', 'ROSULJA', '毛毛雨', 'GERIMIS', 'МРЯКА', 'YRYR', 'MOXÍN', '霧雨', '이슬비', 'רסס'],
  53: ['DRIZZLE', 'BRUINE', 'NIESELREGEN', 'LLOVIZNA', 'PIOGGERELLA', 'MIEZEL', 'ÇİSELEME', 'MRHOLENÍ', 'CHUVISCO', 'ΨΙΧΑΛΑ', 'DUGGREGN', 'MŻAWKA', 'MRHOLENIE', 'MƯA PHÙN', 'BURNIȚĂ', 'BOREIM', 'DYNREGN', 'МОРОСЬ', 'UDUVÍHM', 'ZIRRIMINA', 'TIHKUSADETTA', 'STØVREGN', 'KDRENA', 'PRŠENJE', 'SZITÁLÁS', 'SIPENJE', 'DRUCHLÁK', 'SMRIDZINĀŠANA', 'ROSULJA', '毛毛雨', 'GERIMIS', 'МРЯКА', 'YRYR', 'MOXÍN', '霧雨', '이슬비', 'רסס'],
  55: ['DRIZZLE', 'BRUINE', 'NIESELREGEN', 'LLOVIZNA', 'PIOGGERELLA', 'MIEZEL', 'ÇİSELEME', 'MRHOLENÍ', 'CHUVISCO', 'ΨΙΧΑΛΑ', 'DUGGREGN', 'MŻAWKA', 'MRHOLENIE', 'MƯA PHÙN', 'BURNIȚĂ', 'BOREIM', 'DYNREGN', 'МОРОСЬ', 'UDUVÍHM', 'ZIRRIMINA', 'TIHKUSADETTA', 'STØVREGN', 'KDRENA', 'PRŠENJE', 'SZITÁLÁS', 'SIPENJE', 'DRUCHLÁK', 'SMRIDZINĀŠANA', 'ROSULJA', '毛毛雨', 'GERIMIS', 'МРЯКА', 'YRYR', 'MOXÍN', '霧雨', '이슬비', 'רסס'],
  56: ['FRZG DRIZZLE', 'BRUINE VERGL.', 'GEF. NIESELREGEN', 'LLOVIZNA HELADA', 'PIOGG. GELATA', 'IJZEL', 'DONDURUCU ÇİSELEME', 'MRZN. MRHOLENÍ', 'CHUVISCO GELADO', 'ΠΑΓΩΜΕΝΗ ΨΙΧΑΛΑ', 'UNDERKYLT REGN', 'MARZNĄCA MŻAWKA', 'MRZN. MRHOLENIE', 'MƯA PHÙN LẠNH', 'BURNIȚĂ ÎNGHEȚATĂ', 'BORIM GELAT', 'FROSSEN YRYR', 'ЛЕДЯНАЯ МОРОСЬ', 'JÄÄUDUVÍHM', 'ZIRRIMINA IZOTUA', 'JÄÄTÄVÄÄ TIHKUA', 'ISSLAG', 'LEDO KDRENA', 'LEDENO PRŠENJE', 'ÓNOS SZITÁLÁS', 'LEDENA ROSULJA', 'DRUCHLÁK REOITE', 'SALST SMRIDZIN.', 'LEDENA ROSULJA', '冻毛毛雨', 'GERIMIS BEKU', 'КРИЖАНА МРЯКА', 'YRYR RHEWI', 'MOXÍN XEADA', '着氷性の霧雨', '얼어붙는 이슬비', 'רסס קופא'],
  57: ['FRZG DRIZZLE', 'BRUINE VERGL.', 'GEF. NIESELREGEN', 'LLOVIZNA HELADA', 'PIOGG. GELATA', 'IJZEL', 'DONDURUCU ÇİSELEME', 'MRZN. MRHOLENÍ', 'CHUVISCO GELADO', 'ΠΑΓΩΜΕΝΗ ΨΙΧΑΛΑ', 'UNDERKYLT REGN', 'MARZNĄCA MŻAWKA', 'MRZN. MRHOLENIE', 'MƯA PHÙN LẠNH', 'BURNIȚĂ ÎNGHEȚATĂ', 'BORIM GELAT', 'FROSSEN YRYR', 'ЛЕДЯНАЯ МОРОСЬ', 'JÄÄUDUVÍHM', 'ZIRRIMINA IZOTUA', 'JÄÄTÄVÄÄ TIHKUA', 'ISSLAG', 'LEDO KDRENA', 'LEDENO PRŠENJE', 'ÓNOS SZITÁLÁS', 'LEDENA ROSULJA', 'DRUCHLÁK REOITE', 'SALST SMRIDZIN.', 'LEDENA ROSULJA', '冻毛毛雨', 'GERIMIS BEKU', 'КРИЖАНА МРЯКА', 'YRYR RHEWI', 'MOXÍN XEADA', '着氷性の霧雨', '얼어붙는 이슬비', 'רסס קופא'],
  61: ['LIGHT RAIN', 'PLUIE LÉGÈRE', 'LEICHTER REGEN', 'LLUVIA LIGERA', 'PIOGGIA DEBOLE', 'LICHTE REGEN', 'HAFİF YAĞMUR', 'SLABÝ DÉŠŤ', 'CHUVA FRACA', 'ΑΣΘΕΝΗΣ ΒΡΟΧΗ', 'LÄTT REGN', 'LEKKI DESZCZ', 'SLABÝ DÁŽĎ', 'MƯA NHỎ', 'PLOAIE SLABĂ', 'PLUJA FEBLE', 'LETT REGN', 'НЕБОЛЬШОЙ ДОЖДЬ', 'KERGE VIHM', 'EURI ARINA', 'HEIKKOA SADETTA', 'LETVED', 'LENGVAS LIETUS', 'RAHEL DEŽ', 'GYENGE ESŐ', 'SLABA KIŠA', 'BÁISTEACH ÉADROM', 'VIEGLS LIETUS', 'SLABA KIŠA', '小雨', 'HUJAN RINGAN', 'НЕВЕЛИКИЙ ДОЩ', 'GLAW YSGAFN', 'CHOVIA MIÚDA', '小雨', '약한 비', 'גשם קל'],
  63: ['RAIN', 'PLUIE', 'REGEN', 'LLUVIA', 'PIOGGIA', 'REGEN', 'YAĞMUR', 'DÉŠŤ', 'CHUVA', 'ΒΡΟΧΗ', 'REGN', 'DESZCZ', 'DÁŽĎ', 'MƯA', 'PLOAIE', 'PLUJA', 'REGN', 'ДОЖДЬ', 'VIHM', 'EURIA', 'SADETTA', 'REGN', 'LIETUS', 'DEŽ', 'ESŐ', 'KIŠA', 'BÁISTEACH', 'LIETUS', 'KIŠA', '雨', 'HUJAN', 'ДОЩ', 'GLAW', 'CHOVIA', '雨', '비', 'גשם'],
  65: ['HEAVY RAIN', 'FORTE PLUIE', 'STARKER REGEN', 'LLUVIA FUERTE', 'FORTE PIOGGIA', 'ZWARE REGEN', 'ŞİDDETLİ YAĞMUR', 'SILNÝ DÉŠŤ', 'CHUVA FORTE', 'ΙΣΧΥΡΗ ΒΡΟΧΗ', 'KRAFTIGT REGN', 'SILNY DESZCZ', 'SILNÝ DÁŽĎ', 'MƯA LỚN', 'PLOAIE TORENȚIALĂ', 'PLUJA FORTA', 'KRAFTIG REGN', 'СИЛЬНЫЙ ДОЖДЬ', 'TUGEV VIHM', 'EURI JASA', 'VOIMAKASTA SADETTA', 'KRAFTIG REGN', 'STIPRUS LIETUS', 'MOČAN DEŽ', 'ERŐS ESŐ', 'JAKA KIŠA', 'BÁISTEACH THROM', 'STIPRS LIETUS', 'JAKA KIŠA', '大雨', 'HUJAN LEBAT', 'СИЛЬНИЙ ДОЩ', 'GLAW TRWM', 'CHOVIA FORTE', '大雨', '강한 비', 'גשם כבד'],
  66: ['FREEZING RAIN', 'PLUIE VERGL.', 'GEFRIERENDER REGEN', 'LLUVIA HELADA', 'PIOGGIA GELATA', 'IJZEL', 'DONDURUCU YAĞMUR', 'MRZNOUCÍ DÉŠŤ', 'CHUVA GELADA', 'ΠΑΓΩΜΕΝΗ ΒΡΟΧΗ', 'UNDERKYLT REGN', 'MARZNĄCY DESZCZ', 'MRZNOUCI DÁŽĎ', 'MƯA BĂNG', 'PLOAIE ÎNGHEȚATĂ', 'PLUJA GELADA', 'UNDERKJØLT REGN', 'ЛЕДЯНОЙ ДОЖДЬ', 'JÄÄVIHM', 'EURI IZOTUA', 'JÄÄTÄVÄÄ SADETTA', 'ISSLAG', 'LEDO LIETUS', 'LEDEN DEŽ', 'ÓNOS ESŐ', 'LEDENA KIŠA', 'BÁISTEACH REOITE', 'SALST LIETUS', 'LEDENA KIŠA', '冻雨', 'HUJAN BEKU', 'КРИЖАНИЙ ДОЩ', 'GLAW RHEWI', 'CHOVIA XEADA', '着氷性の雨', '얼어붙는 비', 'גשם קופא'],
  67: ['FREEZING RAIN', 'PLUIE VERGL.', 'GEFRIERENDER REGEN', 'LLUVIA HELADA', 'PIOGGIA GELATA', 'IJZEL', 'DONDURUCU YAĞMUR', 'MRZNOUCÍ DÉŠŤ', 'CHUVA GELADA', 'ΠΑΓΩΜΕΝΗ ΒΡΟΧΗ', 'UNDERKYLT REGN', 'MARZNĄCY DESZCZ', 'MRZNOUCI DÁŽĎ', 'MƯA BĂNG', 'PLOAIE ÎNGHEȚATĂ', 'PLUJA GELADA', 'UNDERKJØLT REGN', 'ЛЕДЯНОЙ ДОЖДЬ', 'JÄÄVIHM', 'EURI IZOTUA', 'JÄÄTÄVÄÄ SADETTA', 'ISSLAG', 'LEDO LIETUS', 'LEDEN DEŽ', 'ÓNOS ESŐ', 'LEDENA KIŠA', 'BÁISTEACH REOITE', 'SALST LIETUS', 'LEDENA KIŠA', '冻雨', 'HUJAN BEKU', 'КРИЖАНИЙ ДОЩ', 'GLAW RHEWI', 'CHOVIA XEADA', '着氷性の雨', '얼어붙는 비', 'גשם קופא'],
  71: ['LIGHT SNOW', 'NEIGE LÉGÈRE', 'LEICHTER SCHNEE', 'NIEVE LIGERA', 'NEVE DEBOLE', 'LICHTE SNEEUW', 'HAFİF KAR', 'SLABÉ SNĚŽENÍ', 'NEVE FRACA', 'ΑΣΘΕΝΗΣ ΧΙΟΝΟΠΤΩΣΗ', 'LÄTT SNÖFALL', 'LEKKI ŚNIEG', 'SLABÉ SNĚŽENIE', 'TUYẾT RƠI NHẸ', 'NINSOARE SLABĂ', 'NEU FEBLE', 'LETT SNØ', 'НЕБОЛЬШОЙ СНЕГ', 'KERGE LUMI', 'ELUR ARINA', 'HEIKKOA LUMISADETTA', 'LETSNE', 'LENGVAS SNIEGAS', 'RAHEL SNEG', 'GYENGE HAVAZÁS', 'SLAB SNIJEG', 'SNEACHTA ÉADROM', 'VIEGLS SNIEGS', 'SLAB SNIJEG', '小雪', 'SALJU RINGAN', 'НЕВЕЛИКИЙ СНІГ', 'EIRA YSGAFN', 'NEVE MIÚDA', '小雪', '약한 눈', 'שלג קל'],
  73: ['SNOW', 'NEIGE', 'SCHNEE', 'NIEVE', 'NEVE', 'SNEEUW', 'KAR', 'SNĚŽENÍ', 'NEVE', 'ΧΙΟΝΟΠΤΩΣΗ', 'SNÖFALL', 'ŚNIEG', 'SNĚŽENIE', 'TUYẾT', 'NINSOARE', 'NEU', 'SNØ', 'СНЕГ', 'LUMI', 'ELURRA', 'LUMISADETTA', 'SNE', 'SNIEGAS', 'SNEG', 'HAVAZÁS', 'SNIJEG', 'SNEACHTA', 'SNIEGS', 'SNIJEG', '雪', 'SALJU', 'СНІГ', 'EIRA', 'NEVE', '雪', '눈', 'שלג'],
  75: ['HEAVY SNOW', 'FORTE NEIGE', 'STARKER SCHNEE', 'NIEVE FUERTE', 'FORTE NEVE', 'ZWARE SNEEUW', 'ŞİDDETLİ KAR', 'SILNÉ SNĚŽENÍ', 'NEVE FORTE', 'ΙΣΧΥΡΗ ΧΙΟΝΟΠΤΩΣΗ', 'KRAFTIGT SNÖFALL', 'SILNY ŚNIEG', 'SILNÉ SNĚŽENIE', 'TUYẾT RƠI LỚN', 'NINSOARE PUTERNICĂ', 'NEU FORTA', 'KRAFTIG SNØ', 'СИЛЬНЫЙ СНЕГ', 'TUGEV LUMI', 'ELUR JASA', 'VOIMAKASTA LUMISADETTA', 'KRAFTIG SNE', 'STIPRUS SNIEGAS', 'MOČAN SNEG', 'ERŐS HAVAZÁS', 'JAK SNIJEG', 'SNEACHTA TROM', 'STIPRS SNIEGS', 'JAK SNIJEG', '大雪', 'SALJU LEBAT', 'СИЛЬНИЙ СНІГ', 'EIRA TRWM', 'NEVE FORTE', '大雪', '강한 눈', 'שלג כבד'],
  77: ['SNOW GRAINS', 'NEIGE EN GRAINS', 'SCHNEEGRIESEL', 'GRANOS DE NIEVE', 'NEVE GRANULOSA', 'SNEEUWKORRELS', 'KAR TANELERİ', 'SNĚHOVÁ ZRNA', 'NEVE EM GRÃOS', 'ΧΙΟΝΟΚΟΚΚΟΙ', 'SNÖKORN', 'ŚNIEG ZIARNISTY', 'SNEHOVÉ ZRNÁ', 'MƯA TUYẾT', 'GRĂUNȚE DE ZĂPADĂ', 'NEU GRANULADA', 'SNØKORN', 'СНЕЖНЫЕ ЗЕРНА', 'LUMEKRUUBID', 'ELUR-GRANULATUAK', 'LUMIJYVÄSIÄ', 'SNEKORN', 'SNIEGO KRUOPOS', 'SNEŽNA ZRNA', 'HÓDARA', 'SNJEŽNA ZRNA', 'GRÁINNÍ SNEACHTA', 'SNIEGA GRAUDI', 'SNEŽNA ZRNA', '雪米', 'BUTIRAN SALJU', 'СНІЖНА КРУПА', 'GRANNAU EIRA', 'NEVE GRANULADA', 'あられ', '눈 알갱이', 'פתיתי שלג'],
  80: ['SHOWERS', 'AVERSES', 'REGENSCHAUER', 'CHUBASCOS', 'ROVESCI', 'BUIEN', 'SAĞANAK', 'PŘEHÁŇKY', 'PANCADAS CHUVA', 'ΟΜΒΡΟΙ', 'REGNSKURAR', 'PRZELOTNE OPADY', 'PREHÁNKY', 'MƯA RÀO', 'AVERSE', 'XFALUTS', 'REGNBYER', 'ЛИВНИ', 'HOOGVIHM', 'EURI-JASAK', 'SADEKUUROJA', 'BYER', 'LIŪTYS', 'PLOHA', 'ZÁPOR', 'PLJUSKOVI', 'CITHEANNA', 'LIETUS GĀZES', 'PLJUSKOVI', '阵雨', 'HUJAN DERAS', 'ЗЛИВИ', 'CAWODDYDD', 'CHUBASCOS', 'にわか雨', '소나기', 'ממטרים'],
  81: ['SHOWERS', 'AVERSES', 'REGENSCHAUER', 'CHUBASCOS', 'ROVESCI', 'BUIEN', 'SAĞANAK', 'PŘEHÁŇKY', 'PANCADAS CHUVA', 'ΟΜΒΡΟΙ', 'REGNSKURAR', 'PRZELOTNE OPADY', 'PREHÁNKY', 'MƯA RÀO', 'AVERSE', 'XFALUTS', 'REGNBYER', 'ЛИВНИ', 'HOOGVIHM', 'EURI-JASAK', 'SADEKUUROJA', 'BYER', 'LIŪTYS', 'PLOHA', 'ZÁPOR', 'PLJUSKOVI', 'CITHEANNA', 'LIETUS GĀZES', 'PLJUSKOVI', '阵雨', 'HUJAN DERAS', 'ЗЛИВИ', 'CAWODDYDD', 'CHUBASCOS', 'にわか雨', '소나기', 'ממטרים'],
  82: ['HEAVY SHOWERS', 'FORTES AVERSES', 'STARKE REGENSC.', 'CHUBASCOS FUERTES', 'FORTI ROVESCI', 'ZWARE BUIEN', 'ŞİDDETLİ SAĞANAK', 'SILNÉ PŘEHÁŇKY', 'PANCADAS FORTES', 'ΙΣΧΥΡΟΙ ΟΜΒΡΟΙ', 'KRAFTIGA SKURAR', 'ULEWA', 'SILNÉ PREHÁNKY', 'MƯA RÀO LỚN', 'AVERSE PUTERNICE', 'XFALUTS FORTS', 'KRAFTIGE BYER', 'СИЛЬНЫЕ ЛИВНИ', 'TUGEV HOOGVIHM', 'EURI-JASA GOGORRA', 'RANKKASATEITA', 'KRAFTIGE BYER', 'STIPRIOS LIŪTYS', 'MOČNA PLOHA', 'ERŐS ZÁPOR', 'JAK PLJUSKOVI', 'CITHEANNA TROMA', 'STIPRAS GĀZES', 'JAK PLJUSKOVI', '强阵雨', 'HUJAN SANGAT DERAS', 'СИЛЬНІ ЗЛИВИ', 'CAWODDYDD TRWM', 'CHUBASCOS FORTES', '激しいにわか雨', '강한 소나기', 'ממטרים כבדים'],
  85: ['SNOW SHOWERS', 'AVERSES NEIGE', 'SCHNEESCHAUER', 'CHUBASCOS NIEVE', 'ROVESCI NEVOSI', 'SNEEUWBUIEN', 'KAR SAĞANAĞI', 'SNĚHOVÉ PŘEHÁŇKY', 'PANCADAS NEVE', 'ΧΙΟΝΟΧΑΛΑΖΟ', 'SNÖBYER', 'PRZELOTNY ŚNIEG', 'SNEHOVÉ PREHÁNKY', 'MƯA TUYẾT RÀO', 'AVERSE DE NINSOARE', 'XFALUTS DE NEU', 'SNØBYER', 'СНЕГОПАДЫ', 'HOOGLUMI', 'ELUR-JASAK', 'LUMIKUUROJA', 'SNEBYER', 'SNIEGO KRUOPOS', 'SNEŽNA PLOHA', 'HÓZÁPOR', 'SNJEŽNI PLJUSKOVI', 'CITHEANNA SNEACHTA', 'SNIEGA GĀZES', 'SNJEŽNI PLJUSKOVI', '阵雪', 'SALJU DERAS', 'СНІЖНІ ЗЛИВИ', 'CAWODDYDD EIRA', 'CHUBASCOS DE NEVE', 'にわか雪', '가끔 눈', 'ממטרי שלג'],
  86: ['SNOW SHOWERS', 'AVERSES NEIGE', 'SCHNEESCHAUER', 'CHUBASCOS NIEVE', 'ROVESCI NEVOSI', 'SNEEUWBUIEN', 'KAR SAĞANAĞI', 'SNĚHOVÉ PŘEHÁŇKY', 'PANCADAS NEVE', 'ΧΙΟΝΟΧΑΛΑΖΟ', 'SNÖBYER', 'PRZELOTNY ŚNIEG', 'SNEHOVÉ PREHÁNKY', 'MƯA TUYẾT RÀO', 'AVERSE DE NINSOARE', 'XFALUTS DE NEU', 'SNØBYER', 'СНЕГОПАДЫ', 'HOOGLUMI', 'ELUR-JASAK', 'LUMIKUUROJA', 'SNEBYER', 'SNIEGO KRUOPOS', 'SNEŽNA PLOHA', 'HÓZÁPOR', 'SNJEŽNI PLJUSKOVI', 'CITHEANNA SNEACHTA', 'SNIEGA GĀZES', 'SNJEŽNI PLJUSKOVI', '阵雪', 'SALJU DERAS', 'СНІЖНІ ЗЛИВИ', 'CAWODDYDD EIRA', 'CHUBASCOS DE NEVE', 'にわか雪', '가끔 눈', 'ממטרי שלג'],
  95: ['THUNDERSTORM', 'ORAGE', 'GEWITTER', 'TORMENTA', 'TEMPORALE', 'ONWEER', 'FIRTINA', 'BOUŘKA', 'TROVOADA', 'ΚΑΤΑΙΓΙΔΑ', 'ÅSKA', 'BURZA', 'BÚRKA', 'DÔNG', 'FURTUNĂ', 'TEMPESTA', 'TORDENVÆR', 'ГРОЗА', 'ÄIKE', 'EKRIETA', 'UKKOSTA', 'TORDEN', 'PERKŪNIJA', 'NEVIHTA', 'VIHAR', 'GRMLJAVINA', 'STOIRM THIURNACH', 'PĒRKONA NEGAISS', 'GRMLJAVINA', '雷暴', 'BADAI PETIR', 'ГРОЗА', 'STORM THARANNAU', 'TORMENTA', '雷雨', '뇌우', 'סופת רעמים'],
  96: ['HAIL STORM', 'ORAGE GRÊLE', 'HAGELSTURM', 'TORM. GRANIZO', 'GRANDINE', 'HAGELBUIEN', 'DOLU', 'KRUPOBITÍ', 'GRANIZO', 'ΧΑΛΑΖΟΠΤΩΣΗ', 'HAGELSKURAR', 'GRAD', 'KRUPOBITIE', 'MƯA ĐÁ', 'GRINDINĂ', 'PEPEDREGADA', 'HAGEL', 'ГРАД', 'RAHE', 'RABASSAIREA', 'RAKEITA', 'HAGEL', 'KRUŠA', 'TOČA', 'JÉGESŐ', 'GRAD', 'STOIRM CHLOCHSHNEA.', 'KRUŠA', 'GRAD', '冰雹', 'HUJAN ES', 'ГРАД', 'STORM CENLLYG', 'TORMENTA DE SARABIA', '雹', '우박', 'סופת ברד'],
  99: ['HAIL STORM', 'ORAGE GRÊLE', 'HAGELSTURM', 'TORM. GRANIZO', 'GRANDINE', 'HAGELBUIEN', 'DOLU', 'KRUPOBITÍ', 'GRANIZO', 'ΧΑΛΑΖΟΠΤΩΣΗ', 'HAGELSKURAR', 'GRAD', 'KRUPOBITIE', 'MƯA ĐÁ', 'GRINDINĂ', 'PEPEDREGADA', 'HAGEL', 'ГРАД', 'RAHE', 'RABASSAIREA', 'RAKEITA', 'HAGEL', 'KRUŠA', 'TOČA', 'JÉGESŐ', 'GRAD', 'STOIRM CHLOCHSHNEA.', 'KRUŠA', 'GRAD', '冰雹', 'HUJAN ES', 'ГРАД', 'STORM CENLLYG', 'TORMENTA DE SARABIA', '雹', '우박', 'סופת ברד']
};

var CARDINALS = (function () {
  var en = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  var fr = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  var de = ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW'];
  var es = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  var it = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  var nl = ['N', 'NO', 'O', 'ZO', 'Z', 'ZW', 'W', 'NW'];
  var tr = ['K', 'KD', 'D', 'GD', 'G', 'GB', 'B', 'KB'];
  var cz = ['S', 'SV', 'V', 'JV', 'J', 'JZ', 'Z', 'SZ'];
  var pt = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
  var el = ['Β', 'ΒΑ', 'Α', 'ΝΑ', 'Ν', 'ΝΔ', 'Δ', 'ΒΔ'];
  var sv = ['N', 'NO', 'O', 'SO', 'S', 'SV', 'V', 'NV'];
  var pl = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  var sk = ['S', 'SV', 'V', 'JV', 'J', 'JZ', 'Z', 'SZ'];
  var vi = ['B', 'ĐB', 'Đ', 'ĐN', 'N', 'TN', 'T', 'TB'];
  var ro = ['N', 'NE', 'E', 'SE', 'S', 'SV', 'V', 'NV'];
  var ca = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  var no = ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'];
  var ru = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
  var et = ['P', 'KA', 'I', 'KG', 'L', 'EL', 'L', 'LO'];
  var eu = ['I', 'IP', 'E', 'HE', 'H', 'HM', 'M', 'IM'];
  var fi = ['P', 'KO', 'I', 'KA', 'E', 'LO', 'L', 'LU'];
  var da = ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'];
  var lt = ['Š', 'ŠR', 'R', 'PR', 'P', 'PV', 'V', 'ŠV'];
  var sl = ['S', 'SV', 'V', 'JV', 'J', 'JZ', 'Z', 'SZ'];
  var hu = ['É', 'ÉK', 'K', 'DK', 'D', 'DY', 'N', 'ÉNY'];
  var hr = ['S', 'SI', 'I', 'JI', 'J', 'JZ', 'Z', 'SZ'];
  var ga = ['T', 'TO', 'O', 'DO', 'D', 'DI', 'I', 'TI'];
  var lv = ['Z', 'ZA', 'A', 'DA', 'D', 'DR', 'R', 'ZR'];
  var sr = ['S', 'SI', 'I', 'JI', 'J', 'JZ', 'Z', 'SZ'];
  var zh = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];
  var id = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL'];
  var uk = ['Пн', 'ПнС', 'С', 'ПдС', 'Пд', 'ПдЗ', 'З', 'ПнЗ'];
  var cy = ['G', 'GG', 'D', 'GD', 'D', 'GD', 'G', 'GG'];
  var gl = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
  var ja = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];
  var ko = ['북', '북동', '동', '남동', '남', '남서', '서', '북서'];
  var he = ['צ׳', 'צמ׳', 'מ׳', 'דמ׳', 'ד׳', 'דמ׳', 'מ׳', 'צמ׳'];

  return [en, fr, de, es, it, nl, tr, cz, pt, el, sv, pl, sk, vi, ro, ca, no, ru, et, eu, fi, da, lt, sl, hu, hr, ga, lv, sr, zh, id, uk, cy, gl, ja, ko, he];
})();

var LABELS = (function () {
  var weeks = ["Week", "Sem", "W", "Sem", "Sett", "Wk", "Hf", "Týd", "Sem", "εβδ", "V", "Tydz", "Týž", "Tuần", "Săpt", "Setm", "Uke", "нед", "Näd", "Ast", "Vk", "Uge", "Sav", "Ted", "Hét", "Tj", "Scht", "Ned", "Ned", "周", "Ming", "Тиж", "Wnos", "Sem", "週", "주", "שב"];
  var days = ["Day", "Jour", "Tag", "Día", "Giorno", "Dag", "Gün", "Den", "Dia", "ημέ", "Dag", "Dzień", "Deň", "Ngày", "Zi", "Dia", "Dag", "ден", "Päev", "Egun", "Päivä", "Dag", "Para", "Dan", "Nap", "Dan", "Lá", "Diena", "Dan", "天", "Hari", "День", "Diwr", "Día", "日", "일", "יום"];
  var stepsNames = ["Steps", "Pas", "Schritte", "Pasos", "Passi", "Stappen", "Adımlar", "Kroky", "Passos", "Βήματα", "Steg", "Kroki", "Kroky", "Bước", "Pași", "Passos", "Skritt", "Шаги", "Sammud", "Urratsak", "Askelta", "Trin", "Žingsniai", "Koraki", "Lépések", "Koraci", "Céimeanna", "Soļi", "Koraci", "步数", "Langkah", "Кроки", "Camau", "Pasos", "歩数", "걸음", "צעדים"];

  var arr = [];
  for (var i = 0; i < 37; i++) {
    arr.push({
      STEPS: stepsNames[i].toUpperCase(),
      WEEK: weeks[i].toUpperCase(),
      DAY: days[i].toUpperCase(),
      DIST_METRIC: 'KM',
      DIST_IMPERIAL: 'MI',
      WIND_METRIC: 'KM/H',
      WIND_IMPERIAL: 'MPH'
    });
  }
  return arr;
})();

module.exports = {
  weatherCodes: WEATHER_CODES,
  cardinals: CARDINALS,
  labels: LABELS
};