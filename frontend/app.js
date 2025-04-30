// 📄 app.js – aktualisiert für QWERTZ-Tastatur und funktionierendes Autocomplete

const input = document.getElementById("input");
const langBtn = document.getElementById("language");
const generateBtn = document.getElementById("generate");
const clearBtn = document.getElementById("clear");
const chat = document.getElementById("chat");
const keyboard = document.getElementById("keyboard");
const autoFrame = document.getElementById("autocomplete");

let lang = "de";

// ⌨️ Tastatur-Layout
const layout = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Y", "X", "C", "V", "B", "N", "M", "Ä", "Ö", "Ü"],
  ["LEER", "←"]
];

// 🧠 Autocomplete-Wörter (hier musst du deine echten 1000 einfügen)
const autocompleteWords = {
  de: [
    "DER", "DIE", "UND", "IN", "DEN", "VON", "ZU", "DAS", "MIT", "SICH",
    "DES", "AUF", "FÜR", "IST", "IM", "DEM", "NICHT", "EIN", "EINE", "ALS",
    "AUCH", "ES", "AN", "WERDEN", "AUS", "ER", "HAT", "DASS", "SIE", "NACH",
    "WIRD", "BEI", "EINER", "UM", "AM", "SIND", "NOCH", "WIE", "EINEM", "ÜBER",
    "EINEN", "SO", "ZUM", "WAR", "HABEN", "NUR", "ODER", "ABER", "VOR", "ZUR",
    "BIS", "MEHR", "DURCH", "MAN", "SEIN", "WURDE", "SEI", "PROZENT", "HATTE", "KANN",
    "GEGEN", "VOM", "KÖNNEN", "SCHON", "WENN", "HABE", "SEINE", "MARK", "IHRE", "DANN",
    "UNTER", "WIR", "SOLL", "ICH", "EINES", "JAHR", "ZWEI", "JAHREN", "DIESE", "DIESER",
    "WIEDER", "KEINE", "UHR", "SEINER", "WORDEN", "WILL", "ZWISCHEN", "IMMER", "MILLIONEN", "WAS",
    "SAGTE", "PLATZ", "WORT", "MEHRERE", "NEUE", "ZEIT", "LEBEN", "MENSCH", "TAG", "KIND",
    "FRAU", "MANN", "HAUS", "BLICK", "STIMME", "HERR", "AUGE", "GESICHT", "MUTTER", "VATER",
    "FRAGE", "ANTWORT", "ARBEIT", "STADT", "LAND", "WELT", "ENDE", "BEGINN", "NEIN", "JA",
    "BITTE", "DANKE", "HALLO", "TSCHÜSS", "GUTEN", "MORGEN", "ABEND", "NACHT", "MEIN", "DEIN",
    "SEIN", "IHR", "UNSER", "EUER", "NAME", "ALTER", "WOHNUNG", "ZIMMER", "ESSEN", "TRINKEN",
    "HUNGER", "DURST", "SCHULE", "LEHRER", "FREUND", "FREUNDIN", "SPIEL", "BUCH", "LESEN", "SCHREIBEN",
    "MUSIK", "TV", "COMPUTER", "HANDY", "ARZT", "KLINIK", "HILFE", "WEH", "ANGST", "GLÜCK",
    "TRAURIG", "MÜDE", "GLÜCKLICH", "WÜTEND", "KALT", "HEISS", "WETTER", "SONNE", "REGEN", "WIND",
    "SCHNEE", "SCHÖN", "SCHLECHT", "GUT", "KÖRPER", "HAND", "FUSS", "BEIN", "ARM", "KOPF",
    "MUND", "ZAHN", "OHR", "HAAR", "AUGE", "NASE", "STUHL", "TISCH", "FENSTER", "TÜR",
    "LAMPEN", "LICHT", "WAND", "BODEN", "DECKE", "SOFA", "BETT", "SCHRANK", "TEPPICH", "BILDER",
    "SPIEGEL", "UHR", "FERNSEHER", "KÜCHE", "HERD", "BACKOFEN", "KÜHLSCHRANK", "GEFRIERER", "TELLER", "GLAS",
    "BECHER", "TASSE", "BESTECK", "MESSER", "GABEL", "LÖFFEL", "TISCHDECKE", "SERVIETTE", "WASSER", "MILCH",
    "SAFT", "TEE", "KAFFEE", "BROTSCHNEIDER", "BUTTER", "MARMELADE", "HONIG", "KÄSE", "WURST", "EI",
    "OBST", "APFEL", "BANANE", "BIRNE", "TRAUBE", "ORANGE", "ZITRONE", "GEMÜSE", "KARTOFFEL", "TOMATE",
    "GURKE", "SALAT", "KAROTTE", "ZWIEBEL", "PAPRIKA", "ERBSEN", "BOHNEN", "REIS", "NUDELN", "SUPPE",

    "FLEISCH", "FISCH", "SCHOKOLADE", "KEKSE", "KUCHEN", "EIS", "ZUCKER", "SALZ", "PFEFFER", "GEWÜRZE",
    "ÖL", "ESSIG", "MEHL", "BACKPULVER", "HEFE", "MIXER", "SCHNEEBESEN", "TOPF", "PFANNE", "SIEB",
    "LÖFFEL", "SCHNEIDEBRETT", "KOCHEN", "BACKEN", "BRATEN", "ESSEN", "TRINKEN", "GENIESSEN", "HUNGRIG", "VOLL",
    "LECKER", "HEISS", "KALT", "WARM", "FRISCH", "ALT", "NEU", "GROß", "KLEIN", "LANG",
    "KURZ", "BREIT", "SCHMAL", "HOCH", "TIEF", "HELL", "DUNKEL", "SCHNELL", "LANGSAM", "LEISE",
    "LAUT", "STARK", "SCHWACH", "SCHWER", "LEICHT", "GLATT", "RAU", "NASS", "TROCKEN", "SAUBER",
    "SCHMUTZIG", "ORDENTLICH", "UNORDENTLICH", "VOLL", "LEER", "RUND", "ECKIG", "HART", "WEICH", "GEÖFFNET",
    "GESCHLOSSEN", "AN", "AUS", "OBEN", "UNTEN", "LINKS", "RECHTS", "VORNE", "HINTEN", "MITTE",
    "BEGINN", "ENDE", "FRÜH", "SPÄT", "JETZT", "BALD", "HEUTE", "MORGEN", "GESTERN", "IMMER",
    "NIE", "MANCHMAL", "OFT", "SELTEN", "VIEL", "WENIG", "MEHR", "WENIGER", "ALLE", "KEIN",
    "JEDER", "NIEMAND", "ETWAS", "NICHTS", "WARUM", "WIE", "WANN", "WO", "WER", "WAS",
    "WELCHER", "WELCHE", "WELCHES", "DIESER", "DIESE", "DIESES", "JENER", "JENE", "JENES", "MEIN",
    "DEIN", "SEIN", "IHR", "UNSER", "EUER", "IHR", "MIR", "DIR", "IHNEN", "SICH",
    "MICH", "DICH", "IHN", "SIE", "ES", "UNS", "EUCH", "WIR", "DU", "ER",
    "SIE", "ES", "ICH", "SEIN", "HABEN", "WERDEN", "KÖNNEN", "MÜSSEN", "DÜRFEN", "WOLLEN",
    "SOLLEN", "MÖGEN", "GEHEN", "KOMMEN", "LAUFEN", "FAHREN", "FLIEGEN", "SCHWIMMEN", "SPRINGEN", "KLETTERN",
    "STEHEN", "SITZEN", "LIEGEN", "FALLEN", "HALTEN", "TRAGEN", "ZIEHEN", "SCHIEBEN", "DREHEN", "WERFEN",
    "FANGEN", "ÖFFNEN", "SCHLIEßEN", "DRÜCKEN", "ZIEHEN", "SCHNEIDEN", "KLEBEN", "MALEN", "ZEICHNEN", "SCHREIBEN",
    "LESEN", "SPRECHEN", "HÖREN", "SEHEN", "RIECHEN", "SCHMECKEN", "FÜHLEN", "DENKEN", "WISSEN", "GLAUBEN",
    "MEINEN", "VERSTEHEN", "ERKLÄREN", "FRAGEN", "ANTWORTEN", "SAGEN", "NENNEN", "ZEIGEN", "SUCHEN", "FINDEN",

    "VERLIEREN", "BEHALTEN", "KAUFEN", "VERKAUFEN", "BEKOMMEN", "NEHMEN", "GEBEN", "SCHENKEN", "BEZAHLEN", "KOSTEN",
    "ARBEITEN", "SPIELEN", "LERNEN", "LEHREN", "STUDIEREN", "BESUCHEN", "WOHNEN", "LEBEN", "BLEIBEN", "GEHEN",
    "FAHREN", "REISEN", "FLIEGEN", "ANRUFEN", "SCHREIBEN", "MAILING", "DRUCKEN", "ZEIGEN", "ERZÄHLEN", "DENKEN",
    "FÜHLEN", "WEINEN", "LACHEN", "SCHREIEN", "SCHLAFEN", "TRÄUMEN", "AUFWACHEN", "STEHEN", "SITZEN", "LIEGEN",
    "HELFEN", "PFLEGEN", "UNTERSTÜTZEN", "BEGLEITEN", "SCHÜTZEN", "RETTEN", "ARZT", "KRANKENHAUS", "KRANK", "GESUND",
    "FIEBER", "SCHMERZEN", "HUSTEN", "SCHNUPFEN", "KOPFSCHMERZEN", "ZAHNSCHMERZEN", "BAUCHSCHMERZEN", "ARZTPRAXIS", "MEDIKAMENT", "TABLETTE",
    "TROPFE", "REZEPT", "UNTERSUCHUNG", "THERAPIE", "OPERATION", "VERBAND", "KRANKENSCHWESTER", "PFLEGER", "NOTFALL", "UNFALL",
    "POLIZEI", "FEUERWEHR", "RETTUNGSDIENST", "NOTRUF", "HILFE", "GEFAHR", "SICHERHEIT", "UNSICHER", "VERLETZT", "VERMISST",
    "GEBURT", "KINDERWAGEN", "BABY", "KLEINKIND", "KITA", "KINDERGARTEN", "SCHULE", "KLASSE", "LEHRER", "LEHRERIN",
    "SCHÜLER", "SCHÜLERIN", "HEFT", "BUCH", "TASCHE", "STIFT", "FEDERTASCHE", "PAUSE", "UNTERRICHT", "HAUSAUFGABEN",
    "PRÜFUNG", "NOTE", "ZEUGNIS", "FERIEN", "URLAUB", "REISE", "ZUG", "BUS", "AUTO", "FLUGZEUG",
    "FAHRRAD", "ROLLER", "MOTORRAD", "BAHN", "HALTESTELLE", "FLUGHAFEN", "BAHNHOF", "TAXI", "FAHRKARTE", "TICKET",
    "PLAN", "KARTE", "STADTPLAN", "NAVIGATION", "WEG", "STRASSE", "GASSE", "BRÜCKE", "TUNNEL", "BAUSTELLE",
    "AMPLE", "ZEBRASTREIFEN", "VERKEHR", "UNFALL", "STAU", "REGEN", "SCHNEE", "WIND", "GEWITTER", "SONNENSCHEIN",
    "TEMPERATUR", "WETTERBERICHT", "KLIMA", "UHR", "KALENDER", "WOCHENTAG", "MONAT", "JAHR", "DATUM", "ZEIT",
    "FRÜH", "SPÄT", "JETZT", "BALD", "HEUTE", "MORGEN", "ÜBERMORGEN", "GESTERN", "VORGESTERN", "IMMER",
    "NIE", "SELTEN", "OFT", "MANCHMAL", "VIELLEICHT", "SICHER", "WAHRSCHEINLICH", "GENAU", "UNGEFÄHR", "HÖCHSTENS",
    "MINDESTENS", "MEIST", "WENIGST", "ZUERST", "DANN", "SPÄTER", "ENDLICH", "GLEICH", "SCHON", "NOCH",

    "ZUFRIEDEN", "UNZUFRIEDEN", "GLÜCKLICH", "TRAURIG", "WÜTEND", "ENTSPANNT", "GESTRESST", "LANGWEILIG", "INTERESSANT", "NEUGIERIG",
    "FROH", "BESORGT", "VERLIEBT", "ALLEIN", "GEMEINSAM", "ZUSAMMEN", "GETRENNT", "FAMILIE", "ELTERN", "MUTTER",
    "VATER", "GESCHWISTER", "BRUDER", "SCHWESTER", "GROßELTERN", "OMA", "OPA", "TANTE", "ONKEL", "COUSINE",
    "COUSIN", "FREUNDE", "BEKANNTE", "NACHBARN", "PARTNER", "PARTNERIN", "EHEMANN", "EHEFRAU", "KIND", "KINDER",
    "SÄUGLING", "KLEINKIND", "TEENAGER", "ERWACHSENER", "SENIOR", "MENSCH", "LEUTE", "PERSON", "NAME", "ALTER",
    "GEBURTSTAG", "WOHNORT", "STRAßE", "NUMMER", "POSTLEITZAHL", "STADT", "LAND", "TELEFON", "HANDY", "EMAIL",
    "SPRACHE", "MUTTERSPRACHE", "DEUTSCH", "ENGLISCH", "FRANZÖSISCH", "SPANISCH", "ITALIENISCH", "TÜRKISCH", "ARABISCH", "CHINESISCH",
    "RUSSISCH", "DOLMETSCHER", "ÜBERSETZER", "TEXT", "GESPRÄCH", "DIALOG", "FRAGE", "ANTWORT", "SATZ", "WORT",
    "BUCHSTABE", "LAUT", "LEISE", "SAG", "REDE", "ERKLÄRE", "ZEIG", "DENK", "FÜHL", "SIEH",
    "HÖR", "RIECH", "SCHMECK", "FASS", "WÄHLE", "TIPPE", "DRÜCKE", "DREHE", "SCHALT", "STARTE",
    "STOPPE", "WECHSLE", "SUCH", "FINDE", "KENNE", "MERKE", "VERGISS", "LERN", "ÜBE", "SPIEL",
    "ARBEITE", "RUHE", "SCHLAFE", "TRÄUME", "STEHE", "GEH", "KOMM", "BLEIB", "SETZ", "LIEG",
    "ÖFFNE", "SCHLIEß", "NIMM", "GIB", "HALT", "TRAG", "ZIEH", "SCHIEB", "WIRF", "FANG",
    "FÜTTERE", "PFLEGE", "BAD", "ZÄHNE", "HAARE", "GESICHT", "KÖRPER", "KLEIDUNG", "HOSE", "HEMD",
    "T-SHIRT", "JACKE", "SCHUHE", "SOCKEN", "MÜTZE", "HANDSCHUHE", "SCHAL", "KLEID", "ROCK", "ANZUG",
    "UNTERHOSE", "BH", "SCHLAFANZUG", "SPORT", "BALL", "LAUFEN", "SPRINGEN", "KLETTERN", "FAHREN", "SPIELPLATZ",
    "HAUSTIER", "HUND", "KATZE", "FISCH", "VOGEL", "HAMSTER", "MEERSCHWEINCHEN", "KANINCHEN", "PFERD", "ZOO",
    "BAUERNHOF", "TIER", "BLUME", "PFLANZE", "BAUM", "GRAS", "BLATT", "WALD", "BERG", "MEER",
    "SEE", "FLUSS", "INSEL", "WIESE", "STEIN", "SAND", "ERDE", "FEUER", "WASSER", "LUFT",
    "STERN", "MOND", "SONNE", "HIMMEL", "WOLKE", "REGEN", "BLITZ", "DONNER", "NEBEL", "REGENBOGEN"
  ],
  es: [
    "DE", "LA", "QUE", "EL", "EN", "Y", "A", "LOS", "DEL", "SE",
    "LAS", "POR", "UN", "CON", "NO", "UNA", "SU", "PARA", "ES", "AL",
    "LO", "COMO", "MÁS", "O", "PERO", "SUS", "LE", "YA", "O", "ESTE",
    "SÍ", "ENTRE", "CUANDO", "TODO", "ESTA", "SER", "SON", "DOS", "TAMBIÉN", "FUE",
    "HABÍA", "ERA", "MUY", "AÑO", "HASTA", "DESDE", "ESTÁ", "MI", "PORQUE", "QUÉ",
    "SÓLO", "HAN", "YO", "HAY", "VEZ", "PUEDA", "TIENE", "TODOS", "ASÍ", "NOS",
    "NI", "PARTE", "TIEMPO", "ÉL", "UNO", "BIEN", "ESE", "AHORA", "CADA", "ESE",
    "VIDA", "OTRO", "DESPUÉS", "TE", "OTROS", "AUN", "ESA", "ESO", "HACER", "ENTONCES",
    "ESE", "EJEMPLO", "ANTES", "DÍA", "MISMO", "GRAN", "ESTOS", "NOSOTROS", "TÚ", "PRIMERO",
    "MENOS", "ALGUNO", "NUESTRO", "NIÑO", "MIRA", "NUEVO", "HACIA", "PUEDE", "AHÍ", "DECIR",
    "COSA", "CASA", "MUNDO", "AQUÍ", "AHÍ", "HOMBRE", "MUJER", "PADRE", "MADRE", "HERMANO",
    "HERMANA", "AMIGO", "AMIGA", "NIÑA", "FAMILIA", "ESCUELA", "TRABAJO", "COLEGIO", "CLASE", "LIBRO",
    "LÁPIZ", "PAPEL", "SILLA", "MESA", "PUERTA", "VENTANA", "CUADERNO", "MOCHILA", "MAESTRO", "PROFESOR",
    "ALUMNO", "ESTUDIANTE", "CAMINO", "CALLE", "CIUDAD", "PUEBLO", "BARRIO", "TIENDA", "MERCADO", "COCHE",
    "AUTOBÚS", "TREN", "AVIÓN", "BARCO", "BICICLETA", "CAMINAR", "CORRER", "SALTAR", "JUGAR", "DORMIR",
    "COMER", "BEBER", "AGUA", "LECHE", "ZUMO", "CAFÉ", "TÉ", "PAN", "ARROZ", "CARNE",
    "PESCADO", "VERDURA", "FRUTA", "MANZANA", "PLÁTANO", "NARANJA", "FRESA", "UVAS", "MELÓN", "SANDÍA",
    "HUEVO", "QUESO", "JAMÓN", "ACEITE", "SAL", "AZÚCAR", "PASTEL", "GALLETAS", "HELADO", "CHOCOLATE",
    "COCINAR", "HORNEAR", "FREÍR", "HERVIR", "CORTAR", "MEZCLAR", "SERVIR", "LIMPIAR", "LAVAR", "BARRER",
    "ABRIR", "CERRAR", "SUBIR", "BAJAR", "ENTRAR", "SALIR", "ENCENDER", "APAGAR", "ESCUCHAR", "VER",
    "HABLAR", "DECIR", "PENSAR", "SENTIR", "REÍR", "LLORAR", "AMAR", "ODIAR", "TEMER", "QUERER",
    "NECESITAR", "BUSCAR", "ENCONTRAR", "PERDER", "GANAR", "DAR", "TOMAR", "LLEVAR", "TRAER", "DEJAR",
    "PONER", "QUITAR", "ABRAZAR", "BESAR", "AYUDAR", "LLAMAR", "ESCRIBIR", "LEER", "MIRAR", "ESPERAR",

    "ENTENDER", "EXPLICAR", "PREGUNTAR", "RESPONDER", "TRABAJAR", "ESTUDIAR", "ENSEÑAR", "APRENDER", "VIVIR", "MORIR",
    "NACER", "CRECER", "CAMBIAR", "SEGUIR", "EMPEZAR", "TERMINAR", "ABURRIDO", "DIVERTIDO", "CANSADO", "FELIZ",
    "TRISTE", "ENFERMO", "SALUDABLE", "FUERTE", "DÉBIL", "ALTO", "BAJO", "GRANDE", "PEQUEÑO", "LARGO",
    "CORTO", "RÁPIDO", "LENTO", "FRÍO", "CALIENTE", "DURO", "BLANDO", "CLARO", "OSCURO", "LIMPIO",
    "SUCIO", "MOJADO", "SECO", "NUEVO", "VIEJO", "BONITO", "FEO", "BUENO", "MALO", "MEJOR",
    "PEOR", "IGUAL", "DIFERENTE", "CARA", "BARATA", "FÁCIL", "DIFÍCIL", "CERCA", "LEJOS", "ALTO",
    "BAJO", "DENTRO", "FUERA", "ARRIBA", "ABAJO", "IZQUIERDA", "DERECHA", "ADELANTE", "ATRÁS", "ENCIMA",
    "DEBAJO", "ALREDEDOR", "SIEMPRE", "NUNCA", "A VECES", "FRECUENTEMENTE", "RARA VEZ", "TAMBIÉN", "TAMPOCO", "PERO",
    "ENTONCES", "DESPUÉS", "ANTES", "LUEGO", "PRIMERO", "SEGUNDO", "FINALMENTE", "HOY", "AYER", "MAÑANA",
    "TARDE", "NOCHE", "MAÑANA", "AHORA", "YA", "TODAVÍA", "AÚN", "PRONTO", "TARDE", "TEMPRANO",
    "NOCHE", "DÍA", "SEMANA", "MES", "AÑO", "SIGLO", "HORA", "MINUTO", "SEGUNDO", "TIEMPO",
    "CALENDARIO", "RELOJ", "FECHA", "CITA", "NUMERO", "UNO", "DOS", "TRES", "CUATRO", "CINCO",
    "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "CIEN",
    "MIL", "PRIMERO", "SEGUNDO", "TERCERO", "CUARTO", "QUINTO", "SEXTO", "SÉPTIMO", "OCTAVO", "NOVENO",
    "DÉCIMO", "ORDEN", "LISTA", "SERIE", "GRUPO", "FAMILIA", "AMIGOS", "PAREJA", "NOVIO", "NOVIA",
    "ESPOSO", "ESPOSA", "HIJO", "HIJA", "PADRE", "MADRE", "ABUELO", "ABUELA", "TÍO", "TÍA",
    "PRIMO", "PRIMA", "NIETO", "NIETA", "HERMANO", "HERMANA", "CUÑADO", "CUÑADA", "SUEGRO", "SUEGRA",
    "YERNO", "NUERA", "PADRASTRO", "MADRASTRA", "HIJASTRO", "HIJASTRA", "COMPAÑERO", "VECINO", "JEFE", "COMPAÑÍA",
    "TRABAJO", "OFICINA", "EMPRESA", "TIENDA", "MERCADO", "RESTAURANTE", "ESCUELA", "UNIVERSIDAD", "HOSPITAL", "FARMACIA",
    "IGLESIA", "TEMPLO", "MUSEO", "BIBLIOTECA", "PARQUE", "PLAZA", "CALLE", "AVENIDA", "CAMINO", "CARRERA",
    "PUENTE", "TÚNEL", "AUTOPISTA", "CARRETERA", "SEÑAL", "SEMÁFORO", "CRUCE", "PEATÓN", "ACERA", "ASFALTO",
    "EDIFICIO", "CASA", "APARTAMENTO", "PISO", "BALCÓN", "JARDÍN", "GARAJE", "ESCALERA", "ASCENSOR", "VENTANA",

    "PUERTA", "TECHO", "PARED", "SUELO", "HABITACIÓN", "COCINA", "BAÑO", "SALÓN", "DORMITORIO", "OFICINA",
    "ESCRITORIO", "SILLA", "MESA", "CAMA", "ARMARIO", "ESPEJO", "LÁMPARA", "TELEVISOR", "TELÉFONO", "COMPUTADORA",
    "ORDENADOR", "PORTÁTIL", "IMPRESORA", "CÁMARA", "RADIO", "INTERNET", "RED", "WI-FI", "CABLE", "ENCHUFE",
    "BATERÍA", "CARGADOR", "BOTÓN", "PANTALLA", "TECLADO", "RATÓN", "ALTAVOZ", "AURICULARES", "MICRÓFONO", "RELOJ",
    "GAFAS", "LENTES", "ROPA", "ZAPATOS", "CAMISA", "PANTALONES", "FALDA", "VESTIDO", "CHAQUETA", "ABRIGO",
    "JERSEY", "SUDADERA", "CORBATA", "TRAJE", "UNIFORME", "SOMBRERO", "GORRA", "BUFANDA", "GUANTES", "CALCETINES",
    "ZAPATILLAS", "BOTAS", "PIJAMA", "BAÑADOR", "ROPA INTERIOR", "SUJETADOR", "CALZONCILLOS", "CAMISETA", "CINTURÓN", "BOLSILLO",
    "BOLSO", "MOCHILA", "MALETA", "MAQUILLAJE", "PEINE", "CEPILLO", "PASTA DENTAL", "CEPILLO DE DIENTES", "TOALLA", "JABÓN",
    "CHAMPÚ", "GEL", "PERFUME", "CREMA", "ESPEJO", "DUCHA", "BAÑERA", "INODORO", "PAPEL HIGIÉNICO", "LAVABO",
    "GRIFO", "ESCUELA", "AULA", "PIZARRA", "PROFESOR", "MAESTRO", "ALUMNO", "ESTUDIANTE", "TAREA", "EXAMEN",
    "NOTA", "CALIFICACIÓN", "LIBRO", "CUADERNO", "LÁPIZ", "BOLÍGRAFO", "GOMA", "REGLA", "MOCHILA", "RECREO",
    "HORARIO", "ASIGNATURA", "MATEMÁTICAS", "CIENCIAS", "LENGUA", "INGLÉS", "GEOGRAFÍA", "HISTORIA", "ARTE", "EDUCACIÓN FÍSICA",
    "MÚSICA", "ORDENADOR", "TECNOLOGÍA", "DEBERES", "EXAMEN", "NOTA", "CERTIFICADO", "DIPLOMA", "CLASE", "GRUPO",
    "COMPAÑERO", "AMIGO", "AMIGA", "PADRE", "MADRE", "HERMANO", "HERMANA", "ABUELO", "ABUELA", "TÍO",
    "TÍA", "PRIMO", "PRIMA", "SOBRINO", "SOBRINA", "PADRASTRO", "MADRASTRA", "HIJASTRO", "HIJASTRA", "HIJO",
    "HIJA", "ESPOSO", "ESPOSA", "NOVIO", "NOVIA", "PAREJA", "AMOR", "AMISTAD", "BESO", "ABRAZO",
    "MANO", "PIE", "CABEZA", "CARAS", "OJOS", "OREJAS", "NARIZ", "BOCA", "PELO", "CUELLO",
    "ESPALDA", "PECHO", "BARRIGA", "BRAZO", "CODO", "MUÑECA", "MANO", "DEDOS", "PIERNA", "RODILLA",
    "TOBILLO", "PIES", "CORAZÓN", "PULMONES", "CEREBRO", "ESTÓMAGO", "HÍGADO", "RIÑONES", "SANGRE", "HUESOS",
    "MÚSCULOS", "PIEL", "ENFERMEDAD", "SALUD", "DOCTOR", "ENFERMERO", "HOSPITAL", "CLÍNICA", "FARMACIA", "MEDICINA",

    "PASTILLA", "JARABE", "INYECCIÓN", "VENDAJE", "CURA", "CITA MÉDICA", "EMERGENCIA", "URGENCIA", "AMBULANCIA", "OPERACIÓN",
    "TERAPIA", "SÍNTOMA", "DIAGNÓSTICO", "REVISIÓN", "EXAMEN MÉDICO", "VACUNA", "ALERGIA", "FIEBRE", "DOLOR", "TOS",
    "RESFRIADO", "GRIPE", "VÓMITO", "DIARREA", "MAREO", "FATIGA", "ESTRÉS", "DEPRESIÓN", "ANSIEDAD", "TRANQUILO",
    "NERVIOSO", "CONTENTO", "TRISTE", "ENFADADO", "PREOCUPADO", "SORPRENDIDO", "ABURRIDO", "CANSADO", "ENERGÍA", "FUERZA",
    "DEBILIDAD", "ALEGRÍA", "MIEDO", "TERROR", "RISA", "LLANTO", "SONRISA", "LÁGRIMAS", "VOZ", "SILENCIO",
    "RUIDO", "MÚSICA", "CANCIÓN", "MELODÍA", "RITMO", "INSTRUMENTO", "GUITARRA", "PIANO", "VIOLÍN", "BATERÍA",
    "CANTO", "BAILE", "ARTE", "DIBUJO", "PINTURA", "ESCULTURA", "TEATRO", "CINE", "PELÍCULA", "ACTOR",
    "ACTRIZ", "DIRECTOR", "ESCENA", "PANTALLA", "SALA", "BUTACA", "ENTRADA", "TICKET", "EVENTO", "FESTIVAL",
    "FERIA", "EXPOSICIÓN", "DEPORTE", "FÚTBOL", "BALONCESTO", "TENIS", "NATACIÓN", "CICLISMO", "CARRERA", "GIMNASIA",
    "EJERCICIO", "PASEO", "CAMINATA", "MONTAÑA", "PLAYA", "RÍO", "LAGO", "MAR", "SOL", "LLUVIA",
    "NIEVE", "VIENTO", "TRUENO", "RELÁMPAGO", "CLIMA", "TEMPERATURA", "CALOR", "FRÍO", "NUBLADO", "DESPEJADO",
    "HÚMEDO", "SECO", "DÍA", "NOCHE", "MAÑANA", "TARDE", "AHORA", "ANTES", "DESPUÉS", "LUEGO",
    "PRONTO", "TEMPRANO", "TARDE", "SIEMPRE", "NUNCA", "A VECES", "FRECUENTEMENTE", "RARA VEZ", "MUY", "POCO",
    "MUCHO", "TODO", "NADA", "ALGO", "ALGUNO", "NINGUNO", "CADA", "OTRO", "MISMO", "DIFERENTE",
    "GRANDE", "PEQUEÑO", "LARGO", "CORTO", "ALTO", "BAJO", "RÁPIDO", "LENTO", "BUENO", "MALO",
    "FÁCIL", "DIFÍCIL", "CARO", "BARATO", "LINDO", "FEO", "NUEVO", "VIEJO", "ABIERTO", "CERRADO",
    "LIMPIO", "SUCIO", "SEGURO", "PELIGROSO", "VACÍO", "LLENO", "CLARO", "OSCURO", "DURO", "BLANDO",
    "REDONDO", "CUADRADO", "TRIANGULAR", "RECTANGULAR", "IZQUIERDA", "DERECHA", "ARRIBA", "ABAJO", "DELANTE", "DETRÁS",
    "CERCA", "LEJOS", "DENTRO", "FUERA", "SOBRE", "DEBAJO", "ENTRE", "ALREDEDOR", "AQUÍ", "ALLÍ"
  ]
};

// 🔤 Tastatur zeichnen
layout.forEach(row => {
  const rowDiv = document.createElement("div");
  row.forEach(key => {
    const btn = document.createElement("button");
    btn.textContent = key;
    btn.className = "key";
    btn.onclick = () => {
      if (key === "LEER") input.value += " ";
      else if (key === "←") input.value = input.value.slice(0, -1);
      else input.value += key;
      autocomplete();
    };
    rowDiv.appendChild(btn);
  });
  keyboard.appendChild(rowDiv);
});

// 🔁 Sprache wechseln
langBtn.onclick = () => {
  lang = lang === "de" ? "es" : "de";
  langBtn.textContent = lang.toUpperCase();
  autocomplete();
};

// 🔤 Autocomplete
function autocomplete() {
  const words = autocompleteWords[lang];
  const current = input.value.trim();
  const parts = current.split(" ");
  const last = parts[parts.length - 1].toUpperCase();

  const matches = words.filter(w => w.startsWith(last) && w !== last).slice(0, 5);

  autoFrame.innerHTML = "";
  matches.forEach(match => {
    const btn = document.createElement("button");
    btn.textContent = match;
    btn.className = "suggestion";
    btn.onclick = () => {
      parts[parts.length - 1] = match;
      input.value = parts.join(" ") + " ";
      autocomplete();
    };
    autoFrame.appendChild(btn);
  });
}

// Vorschläge generieren (GPT)
generateBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;
  const res = await fetch("/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, lang })
  });
  const data = await res.json();
  autoFrame.innerHTML = "";
  data.suggestions.forEach(s => {
    const btn = document.createElement("button");
    btn.textContent = s;
    btn.className = "suggestion";
    btn.onclick = async () => {
      input.value = "";
      await fetch("/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: s, lang })
      });
      chat.innerHTML += `<div class='bubble'>${s}</div>`;
      chat.scrollTop = chat.scrollHeight;
    };
    autoFrame.appendChild(btn);
  });
};

// Eingabe löschen
clearBtn.onclick = () => {
  input.value = "";
  autoFrame.innerHTML = "";
  autocomplete();
};

input.addEventListener("input", autocomplete);
autocomplete();