import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Dumbbell,
  Flame,
  ShieldAlert,
  Timer,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Utensils,
  Pill,
  CheckCircle2,
  Circle,
  Download,
  Upload,
  Smartphone,
  Award,
  Droplets,
  AlertTriangle,
  Info,
  Plus,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Activity,
  Scale,
  Target,
  Clock,
  HeartPulse,
  Check,
  X,
  RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';

// ============================================================================
// BANCO DE DADOS INICIAL: TREINOS (5 DIAS | MÁX 45 MIN | OMBRO DIR. & QUADRIL)
// ============================================================================
const WORKOUT_DAYS = [
  {
    id: 'day1',
    shortTitle: 'SEG • Treino A',
    title: 'Costas (Largura), Tríceps e Barra TAF',
    subtitle: 'Foco em tração vertical segura para o ombro direito e força de puxada para o TAF',
    durationGoal: '42 min',
    cardioIncluded: false,
    warmupNote: '5 min: Mobilidade escapular no elástico + 2x15 Rotação Externa de ombro direito com elástico leve.',
    exercises: [
      {
        id: 'ex_a1',
        name: 'Barra Fixa Assistida (Graviton) ou Puxada Alta c/ Triângulo (Pegada Neutra)',
        muscle: 'Dorsais & Especificidade TAF',
        sets: 4,
        reps: '6 a 10 reps',
        restSeconds: 90,
        defaultLoad: 75,
        jointNote: 'PROTEÇÃO OMBRO DIREITO: A pegada neutra (palmas frente a frente) ou supinada evita o impacto subacromial da barra pronada aberta. Desça apenas até 90% da extensão se sentir fisgada no topo e inicie o movimento deprimindo as escápulas.',
        youtubeQuery: 'puxada alta pegada neutra triangulo execucao correta costas'
      },
      {
        id: 'ex_a2',
        name: 'Remada Baixa Sentado com Triângulo (Pegada Neutra)',
        muscle: 'Dorsal Médio & Romboides',
        sets: 3,
        reps: '10 a 12 reps',
        restSeconds: 75,
        defaultLoad: 65,
        jointNote: 'PROTEÇÃO OMBRO & QUADRIL: Mantenha joelhos semiflexionados e coluna neutra (não balance o tronco para poupar o quadril). Traga o triângulo na direção do umbigo mantendo os cotovelos próximos às costelas.',
        youtubeQuery: 'remada baixa sentado triangulo execucao correta'
      },
      {
        id: 'ex_a3',
        name: 'Remada Unilateral com Halter (Serrote) Apoiado no Banco',
        muscle: 'Grande Dorsal & Estabilizadores',
        sets: 3,
        reps: '10 reps cada lado',
        restSeconds: 60,
        defaultLoad: 30,
        jointNote: 'PROTEÇÃO ARTICULAR: Ao treinar o lado direito, puxe o halter fazendo um arco em direção ao bolso da calça (e não em direção ao peito). Isso zera o pinçamento anterior do ombro direito.',
        youtubeQuery: 'remada unilateral halter serrote execucao correta'
      },
      {
        id: 'ex_a4',
        name: 'Pulldown na Polia Alta com Corda',
        muscle: 'Expansão Dorsal & Serrátil',
        sets: 3,
        reps: '12 a 15 reps',
        restSeconds: 60,
        defaultLoad: 35,
        jointNote: 'PROTEÇÃO OMBRO DIREITO: Usar a corda permite abrir as mãos no final do movimento sem forçar a rotação interna do ombro. Suba os braços apenas até a linha dos olhos.',
        youtubeQuery: 'pulldown com corda na polia costas execucao'
      },
      {
        id: 'ex_a5',
        name: 'Tríceps na Polia Alta com Corda',
        muscle: 'Tríceps Braquial (Cabeça Lateral)',
        sets: 4,
        reps: '10 a 12 reps',
        restSeconds: 60,
        defaultLoad: 30,
        jointNote: 'PROTEÇÃO OMBRO DIREITO: Crave os cotovelos na lateral do tronco. Zero movimentação na articulação do ombro; apenas o antebraço se move.',
        youtubeQuery: 'triceps corda na polia alta execucao correta'
      },
      {
        id: 'ex_a6',
        name: 'Tríceps Testa no Banco Inclinado com Halteres (Pegada Martelo)',
        muscle: 'Tríceps (Cabeça Longa & Medial)',
        sets: 3,
        reps: '10 a 12 reps',
        restSeconds: 60,
        defaultLoad: 14,
        jointNote: 'PROTEÇÃO OMBRO DIREITO: Não faça com barra reta acima da cabeça se houver dor. Com halteres em pegada neutra (martelo), o ombro direito fica na posição mais anatômica e segura.',
        youtubeQuery: 'triceps testa com halteres pegada neutra execucao'
      }
    ]
  },
  {
    id: 'day2',
    shortTitle: 'TER • Treino B + Cárdio 1',
    title: 'Peito, Bíceps + Cárdio TAF 1 (VO2 Máx)',
    subtitle: 'Empurrar com ângulo escapular seguro (30°-45°) + Condicionamento Cardiorrespiratório TAF',
    durationGoal: '45 min (32m Pesos + 13m Cárdio)',
    cardioIncluded: true,
    cardioProtocol: {
      title: 'Cárdio TAF 1: HIIT Tático de Baixo Impacto (13 Minutos)',
      description: 'Para preservar seu quadril de 110kg e construir fôlego explosivo para o TAF: Faça na Bike Ergométrica Pesada ou Esteira com inclinação 3% a 5% (trote cadenciado). 2 min aquecimento + 8 tiros de (45 segundos forte a 85% FCmáx / 45 segundos recuperação leve) + 1 min volta à calma.'
    },
    warmupNote: '4 min: Manguito rotador externo na polia baixa (2x15) + Dislocamento suave de escápulas no banco.',
    exercises: [
      {
        id: 'ex_b1',
        name: 'Supino Inclinado (30°) com Halteres em Pegada Semi-Pronada/Neutra',
        muscle: 'Peitoral Superior & Deltoide Anterior',
        sets: 4,
        reps: '8 a 10 reps',
        restSeconds: 75,
        defaultLoad: 26,
        jointNote: 'REGRA DE OURO OMBRO DIREITO: Jamais use barra reta descendo no pescoço. Incline o banco a apenas 30°, gire os halteres a 45° (pegada semi-neutra) e mantenha os cotovelos abaixo da linha dos ombros. Desça até os cotovelos alinharem com o tronco.',
        youtubeQuery: 'supino inclinado com halteres pegada neutra protecao ombro'
      },
      {
        id: 'ex_b2',
        name: 'Supino Reto com Halteres ou Máquina Articulada Convergente',
        muscle: 'Peitoral Maior (Porção Esternal)',
        sets: 3,
        reps: '10 a 12 reps',
        restSeconds: 75,
        defaultLoad: 30,
        jointNote: 'PROTEÇÃO OMBRO DIREITO: Retraia as escápulas ("esmagando" o banco com as costas) antes de empurrar. Controle a descida e pare 2cm antes de sentir estiramento na cápsula anterior do ombro direito.',
        youtubeQuery: 'supino reto com halteres retracao escapular execucao'
      },
      {
        id: 'ex_b3',
        name: 'Flexão de Braços Tática (Mãos no Solo ou Apoiadas em Step/Banco)',
        muscle: 'Peitoral, Core & Especificidade TAF',
        sets: 3,
        reps: '12 a 18 reps (Ritmo TAF)',
        restSeconds: 60,
        defaultLoad: 110,
        jointNote: 'ESPECIFICIDADE TAF: Mantenha os cotovelos em formato de "seta" (45° em relação ao tronco) e nunca em "T" (90°). Contraia glúteos e abdômen para não deixar o quadril cair.',
        youtubeQuery: 'flexao de bracos correta taf policial cotovelos 45 graus'
      },
      {
        id: 'ex_b4',
        name: 'Rosca Direta na Barra W (Pegada Anatômica)',
        muscle: 'Bíceps Braquial',
        sets: 3,
        reps: '8 a 10 reps',
        restSeconds: 60,
        defaultLoad: 32,
        jointNote: 'PROTEÇÃO OMBRO DIREITO: A barra W alivia a tensão no tendão da cabeça longa do bíceps (que se insere dentro do ombro). Mantenha as escápulas encaixadas atrás.',
        youtubeQuery: 'rosca direta barra w execucao correta'
      },
      {
        id: 'ex_b5',
        name: 'Rosca Martelo Alternada com Halteres',
        muscle: 'Braquial, Braquiorradial & Pegada TAF',
        sets: 3,
        reps: '10 a 12 reps',
        restSeconds: 60,
        defaultLoad: 16,
        jointNote: 'FOCO TAF: Fortalece intensamente o antebraço e o músculo braquial, essenciais para sustentar seus 110kg na barra fixa do TAF sem sobrecarregar o ombro.',
        youtubeQuery: 'rosca martelo com halteres execucao correta'
      }
    ]
  },
  {
    id: 'day3',
    shortTitle: 'QUA • Treino C',
    title: 'Pernas (Blindagem de Quadril) e Abdômen TAF',
    subtitle: 'Alto gasto calórico e hipertrofia de membros inferiores sem impacto femoroacetabular',
    durationGoal: '43 min',
    cardioIncluded: false,
    warmupNote: '5 min: Ativação de glúteo médio (abdução leve) + 1 série leve de Cadeira Extensora (20 reps) para lubrificar joelhos e quadril.',
    exercises: [
      {
        id: 'ex_c1',
        name: 'Leg Press 45° (Pés na Largura Média/Alta e Amplitude Controlada)',
        muscle: 'Quadríceps & Glúteos',
        sets: 4,
        reps: '10 a 12 reps',
        restSeconds: 90,
        defaultLoad: 180,
        jointNote: 'PROTEÇÃO TOTAL DE QUADRIL: Posicione os pés na metade superior da plataforma, levemente abduzidos (pontas dos pés 15° para fora). Desça APENAS até os joelhos formarem 90°. Nunca deixe a coxa bater na barriga/peito para evitar pinçamento no quadril e retroversão pélvica.',
        youtubeQuery: 'leg press 45 execucao correta amplitude segura quadril'
      },
      {
        id: 'ex_c2',
        name: 'Cadeira Extensora com Pico de Contração (2s no topo)',
        muscle: 'Quadríceps (Reto Femoral e Vastos)',
        sets: 4,
        reps: '12 a 15 reps',
        restSeconds: 60,
        defaultLoad: 70,
        jointNote: 'HIPERTROFIA SEM IMPACTO NO QUADRIL: Como o quadril permanece estático apoiado no banco, você consegue levar o quadríceps à falha muscular real com zero estresse articular no quadril ou ombro.',
        youtubeQuery: 'cadeira extensora execucao correta pico de contracao'
      },
      {
        id: 'ex_c3',
        name: 'Mesa Flexora ou Cadeira Flexora',
        muscle: 'Isquiotibiais (Posterior de Coxa)',
        sets: 4,
        reps: '10 a 12 reps',
        restSeconds: 60,
        defaultLoad: 55,
        jointNote: 'PROTEÇÃO DE QUADRIL & CORRIDA TAF: Mantenha a pelve firmemente pressionada contra o estofado. Posteriores fortes absorvem o impacto da corrida de 12 minutos do TAF.',
        youtubeQuery: 'mesa flexora execucao correta posterior de coxa'
      },
      {
        id: 'ex_c4',
        name: 'Elevação Pélvica (Ponte de Glúteo) nas Costas no Banco ou Solo',
        muscle: 'Glúteo Máximo & Estabilização Pélvica',
        sets: 3,
        reps: '12 reps (2s contração no topo)',
        restSeconds: 75,
        defaultLoad: 60,
        jointNote: 'REABILITAÇÃO E FORÇA DE QUADRIL: O glúteo máximo estabiliza a cabeça do fêmur no acetábulo. Suba até alinhar tronco e coxas, contraindo forte o glúteo sem hiperestender a lombar.',
        youtubeQuery: 'elevacao pelvica no banco execucao correta gluteo'
      },
      {
        id: 'ex_c5',
        name: 'Panturrilha Sentado na Máquina ou no Leg Press',
        muscle: 'Sóleo & Gastrocnêmio (Propulsão Corrida)',
        sets: 4,
        reps: '15 a 20 reps',
        restSeconds: 45,
        defaultLoad: 50,
        jointNote: 'PREVENÇÃO DE CANELITE NO TAF: Essencial para corredores acima de 100kg. Controle 2 segundos na descida e 1 segundo no topo.',
        youtubeQuery: 'panturrilha sentado maquina execucao correta'
      },
      {
        id: 'ex_c6',
        name: 'Abdominal Remador Tático (Padrão TAF) + Prancha Isométrica',
        muscle: 'Reto Abdominal & Core Profundo',
        sets: 4,
        reps: '20 reps Remador + 40s Prancha',
        restSeconds: 60,
        defaultLoad: 0,
        jointNote: 'ATENÇÃO OMBRO & QUADRIL NO REMADOR: Ao estender o corpo no solo, não jogue os braços com violência para trás da cabeça (proteja o ombro direito). Pare as mãos na linha da testa e use a força abdominal explosiva para passar os cotovelos da linha dos joelhos.',
        youtubeQuery: 'abdominal remador taf policial tecnica correta'
      }
    ]
  },
  {
    id: 'day4',
    shortTitle: 'QUI • Treino D + Cárdio 2',
    title: 'Costas (Espessura), Tríceps, Pegada & Cárdio TAF 2',
    subtitle: 'Foco em densidade dorsal, isometria de barra fixa e ritmo de prova de 12 minutos (Cooper)',
    durationGoal: '45 min (30m Pesos + 15m Cooper)',
    cardioIncluded: true,
    cardioProtocol: {
      title: 'Cárdio TAF 2: Treino de Ritmo Teste de Cooper (12 a 15 Minutos)',
      description: 'Foco específico na prova de corrida de 12 minutos: Realize 12 minutos contínuos em ritmo constante (Pace alvo entre 5:30/km e 6:00/km para buscar 2.000m a 2.200m+). Se o quadril apresentar qualquer desconforto por conta do peso atual (110kg), faça 6 min na esteira com 1% inclinação + 6 min no Elíptico/Bike mantendo frequência cardíaca em 150-160 bpm.'
    },
    warmupNote: '3 min: Mobilidade torácica e ativação escapular na barra.',
    exercises: [
      {
        id: 'ex_d1',
        name: 'Isometria na Barra Fixa (Pegada Supinada/Neutra) + Negativas Controladas',
        muscle: 'Força Específica TAF & Pegada',
        sets: 4,
        reps: '15s a 25s segurando no topo + descida de 5s',
        restSeconds: 90,
        defaultLoad: 110,
        jointNote: 'ESTRATÉGIA TAF 110KG: Suba com auxílio de um banco, segure o queixo acima da barra mantendo ombros longe das orelhas (escápulas deprimidas) e desça segurando o peso do corpo por 5 segundos. Nunca solte o corpo no fundo com os braços relaxados.',
        youtubeQuery: 'barra fixa negativa e isometria para taf policial'
      },
      {
        id: 'ex_d2',
        name: 'Remada Máquina Articulada (Apoio no Peito - Pegada Neutra)',
        muscle: 'Espessura de Costas & Trapézio Médio',
        sets: 4,
        reps: '8 a 12 reps',
        restSeconds: 75,
        defaultLoad: 70,
        jointNote: 'PROTEÇÃO TOTAL DE QUADRIL E LOMBAR: O apoio no peito elimina 100% da compressão no quadril e coluna, permitindo usar cargas altas com total segurança para o ombro direito em pegada neutra.',
        youtubeQuery: 'remada articulada maquina apoio no peito pegada neutra'
      },
      {
        id: 'ex_d3',
        name: 'Puxada Alta Supinada (Palmas Viradas para Você - Largura dos Ombros)',
        muscle: 'Dorsal Inferior & Bíceps (Transferência TAF)',
        sets: 3,
        reps: '10 a 12 reps',
        restSeconds: 75,
        defaultLoad: 70,
        jointNote: 'PROTEÇÃO OMBRO DIREITO: A pegada supinada coloca o ombro em rotação externa natural, sendo a variação biomecanicamente mais segura e forte para puxar carga.',
        youtubeQuery: 'puxada alta supinada costas execucao correta'
      },
      {
        id: 'ex_d4',
        name: 'Tríceps Francês Unilateral na Polia Baixa ou Barra V na Polia Alta',
        muscle: 'Tríceps (Volume e Força de Bloqueio)',
        sets: 3,
        reps: '10 a 12 reps',
        restSeconds: 60,
        defaultLoad: 35,
        jointNote: 'PROTEÇÃO OMBRO: Prefira a Barra V na polia alta mantendo cotovelos fixos ao lado do corpo para zero impacto no manguito direito.',
        youtubeQuery: 'triceps na polia alta com barra v execucao'
      },
      {
        id: 'ex_d5',
        name: 'Encolhimento c/ Halteres + Sustentação de Carga (Farmer Walk Estático)',
        muscle: 'Trapézio Superior & Força de Pegada TAF',
        sets: 3,
        reps: '12 reps + 30s segurando os halteres',
        restSeconds: 60,
        defaultLoad: 32,
        jointNote: 'BLINDAGEM CERVICAL & PEGADA: Segurar halteres pesados por 30 segundos constrói uma pegada de aço para você não escorregar da barra fixa do TAF.',
        youtubeQuery: 'encolhimento com halteres trapezio execucao correta'
      }
    ]
  },
  {
    id: 'day5',
    shortTitle: 'SEX • Treino E + Simulado',
    title: 'Peito (Estabilidade), Bíceps, Manguito & Simulado TAF',
    subtitle: 'Blindagem articular do manguito rotador direito, hipertrofia de braços e bateria tática TAF',
    durationGoal: '42 min',
    cardioIncluded: false,
    warmupNote: '4 min: Rotação externa e interna de ombro com elástico + aquecimento articular de punhos e cotovelos.',
    exercises: [
      {
        id: 'ex_e1',
        name: 'Floor Press com Halteres (Supino no Solo ou Banco c/ Pausa)',
        muscle: 'Peitoral & Tríceps (Força Pura sem Risco no Ombro)',
        sets: 4,
        reps: '8 a 10 reps',
        restSeconds: 75,
        defaultLoad: 28,
        jointNote: 'EXERCÍCIO DE ELITE PARA OMBRO LESIONADO: No Floor Press (deitado no colchonete), o chão impede fisicamente que seus cotovelos passem da linha do tronco, eliminando 100% do risco de lesão na cápsula anterior do ombro direito!',
        youtubeQuery: 'floor press com halteres supino no chao protecao ombro'
      },
      {
        id: 'ex_e2',
        name: 'Face Pull na Polia Alta com Corda + Rotação Externa',
        muscle: 'Manguito Rotador (Infraespinhal) & Deltoide Posterior',
        sets: 4,
        reps: '15 reps controladas',
        restSeconds: 60,
        defaultLoad: 20,
        jointNote: 'REABILITAÇÃO ATIVA OMBRO DIREITO: Puxe a corda em direção à testa abrindo os cotovelos e girando os punhos para trás. Este exercício reposiciona a cabeça do úmero no centro da articulação.',
        youtubeQuery: 'face pull na polia com corda manguito rotador'
      },
      {
        id: 'ex_e3',
        name: 'Rosca Banco Inclinado 45° c/ Halteres ou Rosca Scott Máquina',
        muscle: 'Bíceps (Cabeça Longa / Pico)',
        sets: 3,
        reps: '10 a 12 reps',
        restSeconds: 60,
        defaultLoad: 14,
        jointNote: 'PROTEÇÃO OMBRO DIREITO: Se optar pelo banco inclinado, não deixe o braço pendurado muito para trás se sentir tensão anterior no ombro; use o apoio do banco Scott como alternativa 100% estável.',
        youtubeQuery: 'rosca scott maquina ou halteres execucao correta'
      },
      {
        id: 'ex_e4',
        name: 'Rosca Inversa na Polia Baixa (Barra Reta ou W)',
        muscle: 'Extensores do Punho, Antebraço & Braquial',
        sets: 3,
        reps: '12 a 15 reps',
        restSeconds: 45,
        defaultLoad: 25,
        jointNote: 'PREVENÇÃO DE EPICONDILITE & FORÇA TAF: Equilibra a força dos flexores do punho e protege os cotovelos nos treinos de barra fixa.',
        youtubeQuery: 'rosca inversa na polia baixa antebraco execucao'
      },
      {
        id: 'ex_e5',
        name: 'Bateria Simulado TAF: 1 min Flexão + 1 min Abdominal Remador',
        muscle: 'Resistência Muscular Localizada TAF',
        sets: 2,
        reps: 'Máximo de repetições limpas em 60s',
        restSeconds: 120,
        defaultLoad: 110,
        jointNote: 'SIMULAÇÃO DE PROVA: Use o cronômetro do app para testar seu número de repetições em 1 minuto e salve seu resultado na aba "Progressão & TAF"!',
        youtubeQuery: 'teste taf policial flexao e abdominal remador 1 minuto'
      }
    ]
  }
];

// ============================================================================
// BANCO DE DADOS: DIETA SII (LOW FODMAP | 4 REFEIÇÕES | 110KG RECOMPOSIÇÃO)
// ============================================================================
const SII_MEALS = [
  {
    id: 'meal1',
    number: 'Refeição 01',
    time: '07:30 (Manhã / Pós-Treino)',
    title: 'Combustível Anabólico de Fácil Digestão',
    calories: 560,
    protein: 52,
    carbs: 48,
    fats: 18,
    siiNote: 'Zero glúten, zero lactose e baixo potencial fermentativo. O cuscuz de milho bem hidratado é uma das melhores fontes de energia limpa para quem tem SII.',
    items: [
      '130g de Cuscuz de Milho cozido (hidratado com água e sal marinho) OU 120g de Batata Doce cozida (porção segura Low FODMAP)',
      '3 Ovos inteiros grandes mexidos no fio de azeite + 80g de Peito de Frango desfiado (ou 4 ovos inteiros + 1 scoop de Whey Isolado)',
      '1 colher de chá de Cúrcuma + Pimenta-do-reino preta nos ovos (potente ação anti-inflamatória para ombro direito e quadril)',
      'Café preto passado sem açúcar (evite adoçantes polióis como xilitol/sorbitol que causam estufamento na SII; se precisar, use Stevia pura)'
    ],
    substitutions: 'Substituição Rápida: Panqueca feita com 40g de Aveia em flocos finos + 3 ovos + 1 dose (30g) de Whey Protein Isolado ou Hidrolisado (Zero Lactose).'
  },
  {
    id: 'meal2',
    number: 'Refeição 02',
    time: '12:30 (Almoço)',
    title: 'Prato Denso de Alta Saciedade e Recuperação Muscular',
    calories: 640,
    protein: 62,
    carbs: 52,
    fats: 20,
    siiNote: 'ATENÇÃO SII: Prepare as carnes apenas com sal, azeite, ervas naturais (alecrim, orégano, salsinha, cebolinha verde) e páprica. Evite alho e cebola refogados e feijão comum.',
    items: [
      '220g de Peito de Frango grelhado OU Carne Bovina Magra (Patinho, Coxão Mole ou Acém magro grelhado/cozido)',
      '160g de Arroz Branco ou Parboilizado cozido (absorção completa no intestino delgado, zero fermentação colônica)',
      'Salada SII-Safe à vontade: Alface, Rúcula, Pepino japonês e 80g de Cenoura ralada ou Chuchu cozido',
      '1 colher de sopa (10ml) de Azeite de Oliva Extravirgem cru sobre a salada'
    ],
    substitutions: 'Substituição de Carboidrato: 200g de Batata Inglesa cozida/assada na Airfryer ou 130g de Mandioca (Aipim) cozida.'
  },
  {
    id: 'meal3',
    number: 'Refeição 03',
    time: '16:30 (Tarde / Sustentação Metabólica)',
    title: 'Aporte Proteico Rápido & Energia Estável',
    calories: 510,
    protein: 50,
    carbs: 42,
    fats: 15,
    siiNote: 'A banana deve estar firme (não muito madura/pintada), pois bananas muito maduras aumentam o teor de frutanos (FODMAPs).',
    items: [
      '1,5 Scoop (45g) de Whey Protein Isolado ou Hidrolisado (Zero Lactose) OU 1 lata de Atum em água escorrido + 2 ovos cozidos',
      '40g de Aveia em flocos (até 50g é certificada como Low FODMAP e excelente para controle de colesterol aos 41 anos)',
      '1 unidade média (90g) de Banana Nanica ou Prata firme (ou 100g de Mamão Papaia / Morangos)',
      '15g de Pasta de Amendoim integral sem açúcar (ou 15g de Castanha-do-Pará / Nozes)'
    ],
    substitutions: 'Opção Salgada: 150g de Frango desfiado ou Patinho moído + 2 fatias de Pão de Forma Sem Glúten/Fermentação Natural + 1 fatia de Queijo Minas Zero Lactose.'
  },
  {
    id: 'meal4',
    number: 'Refeição 04',
    time: '20:30 (Jantar - Leve, Digestivo e Pró-Sono)',
    title: 'Nutrição Noturna Reparadora e Anti-inflamatória',
    calories: 540,
    protein: 54,
    carbs: 33,
    fats: 19,
    siiNote: 'Jantar planejado para esvaziamento gástrico rápido, garantindo sono profundo (pico de GH e Testosterona noturna) sem refluxo ou distensão abdominal.',
    items: [
      '220g de Filé de Tilápia, Merluza, Sardinha assada OU Peito de Frango em cubos',
      '130g de Purê de Abóbora Cabotiá (feita com água e fio de azeite) OU 120g de Mandioca cozida',
      '100g de Abobrinha verde ou Berinjela grelhada com orégano e azeite',
      '2 Ovos cozidos ou 1 fio extra de azeite extravirgem (se optar por peixe branco magro como tilápia)'
    ],
    substitutions: 'Opção Prática: Omelete de 4 ovos inteiros + 100g de Frango desfiado + 30g de Queijo Muçarela Zero Lactose + 100g de Batata Inglesa.'
  }
];

// ============================================================================
// BANCO DE DADOS: SUPLEMENTAÇÃO & SAÚDE MASCULINA (41 ANOS | 110KG)
// ============================================================================
const SUPPLEMENTS_DATA = [
  {
    id: 'sup_1',
    block: 'Bloco 1: Performance, Força e TAF',
    name: 'Creatina Monohidratada Pura (100% Creapure ou Micronizada)',
    dose: '6g todos os dias (calculado para 110kg)',
    timing: 'Pós-treino ou junto com a Refeição 1 (com carboidrato)',
    benefit: 'Aumenta os estoques de fosfocreatina intramuscular, essencial para explosão na Barra Fixa, tiros de corrida do TAF e preservação da massa magra durante o déficit calórico. Não irrita o intestino se diluída em bastante água.',
    priority: 'Essencial'
  },
  {
    id: 'sup_2',
    block: 'Bloco 1: Performance, Força e TAF',
    name: 'Beta-Alanina + Citrulina Malato + Taurina (Pré-Treino Sem Irritação SII)',
    dose: '3g Beta-Alanina + 6g Citrulina + 2g Taurina',
    timing: '30 min antes do treino',
    benefit: 'Combinação de elite para o TAF: A Beta-Alanina tampona o ácido lático (permitindo fazer mais repetições de flexão, barra e correr os 12 min sem "queimar" as pernas precocemente), enquanto a Citrulina aumenta o óxido nítrico e protege a pressão arterial sem dar taquicardia ou diarreia (comum em pré-treinos cheios de cafeína artificial).',
    priority: 'Alta Performance TAF'
  },
  {
    id: 'sup_3',
    block: 'Bloco 2: Saúde Masculina & Eixo Hormonal (41 Anos)',
    name: 'Ashwagandha (Extrato Padronizado KSM-66)',
    dose: '600mg ao dia',
    timing: 'À noite, junto com o Jantar (Refeição 4)',
    benefit: 'Aos 41 anos, com rotina intensa de treinos e preparação para concurso, o cortisol elevado derruba a testosterona livre e acumula gordura visceral. A Ashwagandha reduz o cortisol em até 27%, melhora a qualidade do sono profundo e apoia a produção natural de testosterona.',
    priority: 'Saúde Masculina'
  },
  {
    id: 'sup_4',
    block: 'Bloco 2: Saúde Masculina & Eixo Hormonal (41 Anos)',
    name: 'Vitamina D3 + Vitamina K2 (MK-7) + Zinco Quelato + Magnésio Bisglicinato',
    dose: '4.000 UI D3 + 100mcg K2 + 25mg Zinco + 350mg Magnésio',
    timing: 'D3/K2/Zinco no Almoço | Magnésio 40 min antes de dormir',
    benefit: 'Base hormonal masculina: O Zinco e a Vitamina D3 são cofatores diretos na síntese de testosterona nas células de Leydig. O Magnésio Bisglicinato (forma que NÃO solta o intestino na SII, diferente do óxido/citrato) relaxa a musculatura, previne cãibras e otimiza o sono.',
    priority: 'Essencial'
  },
  {
    id: 'sup_5',
    block: 'Bloco 2: Saúde Masculina & Eixo Hormonal (41 Anos)',
    name: 'Coenzima Q10 (Ubiquinol / Ubiquinona)',
    dose: '100mg a 200mg ao dia',
    timing: 'Junto com o Almoço (precisa de gordura do azeite para absorver)',
    benefit: 'Após os 40 anos, a produção natural de CoQ10 cai, afetando a energia das mitocôndrias do coração e dos músculos esqueléticos. Melhora o fôlego cardiovascular para a corrida de 12 minutos e protege o endotélio vascular.',
    priority: 'Cardioproteção'
  },
  {
    id: 'sup_6',
    block: 'Bloco 3: Blindagem Articular (Ombro Dir. & Quadril) + Intestino (SII)',
    name: 'Colágeno Tipo II Não Desnaturado (UC-II) + Curcumina Padronizada',
    dose: '40mg Colágeno Tipo II + 500mg Curcumina',
    timing: 'Em jejum ou antes de dormir',
    benefit: 'Atua diretamente na dessensibilização imunológica da cartilagem articular do seu Ombro Direito e do Quadril, reduzindo a inflamação sinovial, estalos e dores pós-treino sem agredir o estômago ou intestino como anti-inflamatórios farmacológicos.',
    priority: 'Blindagem Articular'
  },
  {
    id: 'sup_7',
    block: 'Bloco 3: Blindagem Articular (Ombro Dir. & Quadril) + Intestino (SII)',
    name: 'Ômega 3 Ultra Concentrado (Certificado IFOS - Alto EPA/DHA)',
    dose: '3g ao dia (fornecendo pelo menos 1.800mg de EPA+DHA combinados)',
    timing: 'Fracionado no Almoço e Jantar',
    benefit: 'Potente modulador inflamatório sistêmico: lubrifica as articulações sob carga (ombro e quadril), melhora a sensibilidade à insulina para queima de gordura e melhora o perfil lipídico (HDL/Triglicerídeos).',
    priority: 'Essencial'
  },
  {
    id: 'sup_8',
    block: 'Bloco 3: Blindagem Articular (Ombro Dir. & Quadril) + Intestino (SII)',
    name: 'L-Glutamina Pura + Psyllium (Opcional conforme perfil da SII)',
    dose: '5g a 10g de L-Glutamina',
    timing: 'Em jejum pela manhã com 200ml de água',
    benefit: 'A Glutamina é o combustível primário dos enterócitos (células da parede do intestino delgado). Em portadores de SII, ela repara as "tight junctions" (reduzindo a permeabilidade intestinal / leaky gut) e melhora a absorção das proteínas da dieta.',
    priority: 'Blindagem SII'
  }
];

// ============================================================================
// DADOS HISTÓRICOS INICIAIS PARA OS GRÁFICOS (CASO SEJA O PRIMEIRO ACESSO)
// ============================================================================
const INITIAL_WORKOUT_LOGS = [
  { id: 'log1', date: '05/10', exerciseId: 'ex_a1', load: 70, reps: 8, volume: 560 },
  { id: 'log2', date: '12/10', exerciseId: 'ex_a1', load: 75, reps: 8, volume: 600 },
  { id: 'log3', date: '19/10', exerciseId: 'ex_a1', load: 75, reps: 10, volume: 750 },
  { id: 'log4', date: '06/10', exerciseId: 'ex_b1', load: 22, reps: 10, volume: 220 },
  { id: 'log5', date: '13/10', exerciseId: 'ex_b1', load: 24, reps: 10, volume: 240 },
  { id: 'log6', date: '20/10', exerciseId: 'ex_b1', load: 26, reps: 10, volume: 260 },
  { id: 'log7', date: '07/10', exerciseId: 'ex_c1', load: 160, reps: 10, volume: 1600 },
  { id: 'log8', date: '14/10', exerciseId: 'ex_c1', load: 170, reps: 12, volume: 2040 },
  { id: 'log9', date: '21/10', exerciseId: 'ex_c1', load: 180, reps: 12, volume: 2160 }
];

const INITIAL_WEIGHT_LOGS = [
  { date: 'Sem 1', weight: 110.0, waist: 108 },
  { date: 'Sem 2', weight: 109.1, waist: 107 },
  { date: 'Sem 3', weight: 108.4, waist: 105.5 }
];

const INITIAL_TAF_LOGS = [
  { date: 'Avaliação 1', pullups: 2, pushups: 18, situps: 24, runMeters: 1750 },
  { date: 'Avaliação 2', pullups: 3, pushups: 22, situps: 29, runMeters: 1920 },
  { date: 'Atual', pullups: 4, pushups: 25, situps: 33, runMeters: 2080 }
];

export default function App() {
  // Navegação Principal
  const [activeTab, setActiveTab] = useState('treinos'); // 'treinos' | 'progressao' | 'dieta' | 'suplementos'
  const [selectedDayId, setSelectedDayId] = useState('day1');

  // Modais e Notificações Customizadas (Sem usar alert/confirm)
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Cronômetro Global de Sessão (45:00 = 2700 segundos)
  const [sessionSeconds, setSessionSeconds] = useState(45 * 60);
  const [isSessionRunning, setIsSessionRunning] = useState(false);

  // Timer de Descanso Entre Séries
  const [restSeconds, setRestSeconds] = useState(60);
  const [restTotal, setRestTotal] = useState(60);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Estados Persistentes no localStorage
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('tactical41_workout_logs');
      return saved ? JSON.parse(saved) : INITIAL_WORKOUT_LOGS;
    } catch {
      return INITIAL_WORKOUT_LOGS;
    }
  });

  const [completedExercisesToday, setCompletedExercisesToday] = useState(() => {
    try {
      const saved = localStorage.getItem('tactical41_completed_ex');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [exerciseInputs, setExerciseInputs] = useState(() => {
    try {
      const saved = localStorage.getItem('tactical41_ex_inputs');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const defaults = {};
    WORKOUT_DAYS.forEach(day => {
      day.exercises.forEach(ex => {
        defaults[ex.id] = { load: ex.defaultLoad, reps: 10 };
      });
    });
    return defaults;
  });

  const [weightLogs, setWeightLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('tactical41_weight_logs');
      return saved ? JSON.parse(saved) : INITIAL_WEIGHT_LOGS;
    } catch {
      return INITIAL_WEIGHT_LOGS;
    }
  });

  const [tafLogs, setTafLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('tactical41_taf_logs');
      return saved ? JSON.parse(saved) : INITIAL_TAF_LOGS;
    } catch {
      return INITIAL_TAF_LOGS;
    }
  });

  const [checkedMeals, setCheckedMeals] = useState(() => {
    try {
      const saved = localStorage.getItem('tactical41_checked_meals');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [waterIntakeMl, setWaterIntakeMl] = useState(() => {
    try {
      const saved = localStorage.getItem('tactical41_water_ml');
      return saved ? Number(saved) : 1500;
    } catch {
      return 1500;
    }
  });

  const [checkedSupplements, setCheckedSupplements] = useState(() => {
    try {
      const saved = localStorage.getItem('tactical41_checked_supps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Estados da Aba de Progressão
  const [selectedChartExercise, setSelectedChartExercise] = useState('ex_a1');
  const [newWeightInput, setNewWeightInput] = useState('');
  const [newWaistInput, setNewWaistInput] = useState('');
  const [newTafInput, setNewTafInput] = useState({
    pullups: '',
    pushups: '',
    situps: '',
    runMeters: ''
  });

  const fileInputRef = useRef(null);

  // Salvar alterações no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tactical41_workout_logs', JSON.stringify(workoutLogs));
      localStorage.setItem('tactical41_completed_ex', JSON.stringify(completedExercisesToday));
      localStorage.setItem('tactical41_ex_inputs', JSON.stringify(exerciseInputs));
      localStorage.setItem('tactical41_weight_logs', JSON.stringify(weightLogs));
      localStorage.setItem('tactical41_taf_logs', JSON.stringify(tafLogs));
      localStorage.setItem('tactical41_checked_meals', JSON.stringify(checkedMeals));
      localStorage.setItem('tactical41_water_ml', String(waterIntakeMl));
      localStorage.setItem('tactical41_checked_supps', JSON.stringify(checkedSupplements));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }, [
    workoutLogs,
    completedExercisesToday,
    exerciseInputs,
    weightLogs,
    tafLogs,
    checkedMeals,
    waterIntakeMl,
    checkedSupplements
  ]);

  // Capturar evento nativo de instalação PWA se disponível no navegador
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Função utilitária para exibir notificações Toast
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sintetizador de Alerta Sonoro (Web Audio API) para fim do descanso
  const playBeepSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const times = [0, 0.22, 0.44];
      times.forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(idx === 2 ? 1046.5 : 880, ctx.currentTime + offset);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.18);
      });
    } catch (err) {
      console.error('Áudio bloqueado ou indisponível:', err);
    }
  };

  // Loop do Cronômetro Global de Sessão (45 min)
  useEffect(() => {
    if (!isSessionRunning) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => {
        if (prev <= 1) {
          setIsSessionRunning(false);
          playBeepSound();
          showToast('Tempo limite de 45 minutos da sessão atingido! Excelente foco!', 'warning');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSessionRunning]);

  // Loop do Timer de Descanso Entre Séries
  useEffect(() => {
    if (!isRestRunning) return;
    const interval = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev <= 1) {
          setIsRestRunning(false);
          playBeepSound();
          showToast('Descanso finalizado! Hora da próxima série!', 'success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRestRunning, soundEnabled]);

  const startRestTimer = (seconds) => {
    setRestTotal(seconds);
    setRestSeconds(seconds);
    setIsRestRunning(true);
    if (!isSessionRunning && sessionSeconds === 45 * 60) {
      setIsSessionRunning(true);
    }
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Manipulação de Cargas e Séries
  const handleInputChange = (exId, field, value) => {
    setExerciseInputs((prev) => ({
      ...prev,
      [exId]: {
        ...(prev[exId] || { load: 20, reps: 10 }),
        [field]: value
      }
    }));
  };

  const handleLogExercise = (exercise) => {
    const currentInput = exerciseInputs[exercise.id] || { load: exercise.defaultLoad, reps: 10 };
    const loadNum = Number(currentInput.load) || 0;
    const repsNum = Number(currentInput.reps) || 1;
    const todayStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    const newLog = {
      id: `log_${Date.now()}`,
      date: todayStr,
      exerciseId: exercise.id,
      load: loadNum,
      reps: repsNum,
      volume: loadNum * repsNum
    };

    setWorkoutLogs((prev) => [...prev, newLog]);
    setCompletedExercisesToday((prev) => ({
      ...prev,
      [exercise.id]: true
    }));

    // Inicia automaticamente o descanso recomendado do exercício
    startRestTimer(exercise.restSeconds);
    showToast(`Carga registrada (${loadNum}kg x ${repsNum} reps) e descanso de ${exercise.restSeconds}s iniciado!`);
  };

  const toggleExerciseDone = (exId) => {
    setCompletedExercisesToday((prev) => ({
      ...prev,
      [exId]: !prev[exId]
    }));
  };

  // Adicionar novo peso corporal
  const handleAddWeightLog = (e) => {
    e.preventDefault();
    const w = parseFloat(newWeightInput);
    if (!w || w < 50 || w > 250) {
      showToast('Informe um peso válido em kg.', 'warning');
      return;
    }
    const waist = parseFloat(newWaistInput) || (weightLogs[weightLogs.length - 1]?.waist || 105);
    const todayStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    setWeightLogs((prev) => [...prev, { date: todayStr, weight: w, waist }]);
    setNewWeightInput('');
    setNewWaistInput('');
    showToast(`Peso atualizado para ${w} kg!`);
  };

  // Adicionar novo Simulado TAF
  const handleAddTafLog = (e) => {
    e.preventDefault();
    const latest = tafLogs[tafLogs.length - 1] || { pullups: 3, pushups: 20, situps: 30, runMeters: 2000 };
    const pullups = newTafInput.pullups !== '' ? Number(newTafInput.pullups) : latest.pullups;
    const pushups = newTafInput.pushups !== '' ? Number(newTafInput.pushups) : latest.pushups;
    const situps = newTafInput.situps !== '' ? Number(newTafInput.situps) : latest.situps;
    const runMeters = newTafInput.runMeters !== '' ? Number(newTafInput.runMeters) : latest.runMeters;

    const todayStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    setTafLogs((prev) => [...prev, { date: todayStr, pullups, pushups, situps, runMeters }]);
    setNewTafInput({ pullups: '', pushups: '', situps: '', runMeters: '' });
    showToast('Simulado TAF registrado com sucesso no seu histórico!');
  };

  // Exportar e Importar Backup JSON
  const handleExportData = () => {
    const backup = {
      workoutLogs,
      completedExercisesToday,
      exerciseInputs,
      weightLogs,
      tafLogs,
      checkedMeals,
      waterIntakeMl,
      checkedSupplements,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tactical_fit_41_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup de dados exportado com sucesso!');
  };

  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.workoutLogs) setWorkoutLogs(parsed.workoutLogs);
        if (parsed.weightLogs) setWeightLogs(parsed.weightLogs);
        if (parsed.tafLogs) setTafLogs(parsed.tafLogs);
        if (parsed.exerciseInputs) setExerciseInputs(parsed.exerciseInputs);
        if (parsed.checkedMeals) setCheckedMeals(parsed.checkedMeals);
        if (parsed.checkedSupplements) setCheckedSupplements(parsed.checkedSupplements);
        showToast('Histórico restaurado com sucesso!');
        setShowInstallModal(false);
      } catch {
        showToast('Arquivo JSON inválido.', 'warning');
      }
    };
    reader.readAsText(file);
  };

  // Dados computados
  const currentDayObj = useMemo(
    () => WORKOUT_DAYS.find((d) => d.id === selectedDayId) || WORKOUT_DAYS[0],
    [selectedDayId]
  );

  const allExercisesList = useMemo(() => {
    const list = [];
    WORKOUT_DAYS.forEach((day) => {
      day.exercises.forEach((ex) => {
        list.push({ ...ex, dayTitle: day.shortTitle });
      });
    });
    return list;
  }, []);

  const filteredExerciseLogs = useMemo(() => {
    const logs = workoutLogs.filter((l) => l.exerciseId === selectedChartExercise);
    if (logs.length > 0) return logs;
    // Se ainda não houver múltiplos logs para aquele exercício específico, cria ponto inicial a partir da carga padrão
    const exObj = allExercisesList.find((e) => e.id === selectedChartExercise);
    const baseLoad = exObj ? exObj.defaultLoad : 30;
    return [
      { date: 'Início', load: Math.max(5, baseLoad - 4), reps: 8, volume: Math.max(5, baseLoad - 4) * 8 },
      { date: 'Atual', load: baseLoad, reps: 10, volume: baseLoad * 10 }
    ];
  }, [workoutLogs, selectedChartExercise, allExercisesList]);

  const currentWeight = weightLogs[weightLogs.length - 1]?.weight || 110;
  const latestTaf = tafLogs[tafLogs.length - 1] || { pullups: 4, pushups: 25, situps: 33, runMeters: 2080 };

  const consumedMacros = useMemo(() => {
    return SII_MEALS.reduce(
      (acc, meal) => {
        if (checkedMeals[meal.id]) {
          acc.calories += meal.calories;
          acc.protein += meal.protein;
          acc.carbs += meal.carbs;
          acc.fats += meal.fats;
        }
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [checkedMeals]);

  const restProgressPercent = restTotal > 0 ? ((restTotal - restSeconds) / restTotal) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-28 selection:bg-emerald-500 selection:text-slate-950">
      {/* NOTIFICAÇÃO TOAST FLUTUANTE */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-bounce">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${
              toastMessage.type === 'warning'
                ? 'bg-amber-950/95 border-amber-500 text-amber-200'
                : 'bg-emerald-950/95 border-emerald-500 text-emerald-200'
            }`}
          >
            {toastMessage.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* HEADER TÁTICO E FICHA DO ATLETA */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Logo & Identidade */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/40 border border-emerald-400/30">
                <Dumbbell className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                    TACTICAL FIT <span className="text-emerald-400">41+</span>
                  </h1>
                  <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    TAF Policial & SII
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex flex-wrap items-center gap-x-2">
                  <span>Homem 41a</span> • <span>1,77m</span> •{' '}
                  <span className="text-amber-400 font-semibold">{currentWeight} kg</span> •{' '}
                  <span className="text-red-400 font-medium">Proteção: Ombro Dir. & Quadril</span>
                </p>
              </div>
            </div>

            {/* Cronômetro Global de Sessão (45:00) + Botão Instalar */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                  sessionSeconds < 300
                    ? 'bg-red-950/60 border-red-500/50 text-red-300'
                    : isSessionRunning
                    ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800/90 border-slate-700 text-slate-200'
                }`}
                title="Cronômetro Regressivo de 45 Minutos da Sessão"
              >
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 leading-none">
                    Sessão (Máx 45m)
                  </div>
                  <div className="text-sm sm:text-base font-mono font-bold leading-tight">
                    {formatTime(sessionSeconds)}
                  </div>
                </div>
                <button
                  onClick={() => setIsSessionRunning(!isSessionRunning)}
                  className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-emerald-600 hover:text-slate-950 transition"
                  aria-label="Iniciar ou Pausar Sessão"
                >
                  {isSessionRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsSessionRunning(false);
                    setSessionSeconds(45 * 60);
                  }}
                  className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 transition"
                  aria-label="Resetar Sessão de 45 min"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setShowInstallModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden md:inline">Instalar App / Backup</span>
                <span className="md:hidden">App</span>
              </button>
            </div>
          </div>

          {/* NAVEGAÇÃO DE ABAS PRINCIPAIS */}
          <nav className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-3 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setActiveTab('treinos')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                activeTab === 'treinos'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Dumbbell className="w-4 h-4 shrink-0" />
              <span>1. Treinos (5x)</span>
            </button>

            <button
              onClick={() => setActiveTab('progressao')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                activeTab === 'progressao'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>2. Evolução & TAF</span>
            </button>

            <button
              onClick={() => setActiveTab('dieta')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                activeTab === 'dieta'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Utensils className="w-4 h-4 shrink-0" />
              <span>3. Dieta SII (4x)</span>
            </button>

            <button
              onClick={() => setActiveTab('suplementos')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                activeTab === 'suplementos'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Pill className="w-4 h-4 shrink-0" />
              <span>4. Suplementos</span>
            </button>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-5">
        {/* ===================================================================
            ABA 1: TREINOS (5 DIAS | MÁX 45 MIN | OMBRO DIREITO & QUADRIL)
           =================================================================== */}
        {activeTab === 'treinos' && (
          <div className="space-y-5">
            {/* Banner de Diretriz Biomecânica */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    Protocolo de Blindagem Articular: Ombro Direito & Quadril (110 kg)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                    Exercícios com barra reta acima da cabeça, puxadas atrás da nuca e agachamentos profundos livres foram{' '}
                    <span className="text-red-400 font-semibold">eliminados</span>. Priorizamos{' '}
                    <span className="text-emerald-400 font-semibold">
                      pegadas neutras/supinadas, plano escapular (30°-45°) e estabilidade pélvica
                    </span>{' '}
                    para máxima hipertrofia, queima de gordura e aprovação no TAF em até 45 minutos.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => {
                    setCompletedExercisesToday({});
                    showToast('Checklist do dia reiniciado para uma nova semana!');
                  }}
                  className="text-xs flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Limpar Concluídos
                </button>
              </div>
            </div>

            {/* Seletor dos 5 Dias de Treino */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {WORKOUT_DAYS.map((day) => {
                const isSelected = day.id === selectedDayId;
                const doneCount = day.exercises.filter((e) => completedExercisesToday[e.id]).length;
                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`text-left p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span
                        className={`text-xs font-extrabold uppercase tracking-wider ${
                          isSelected ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {day.shortTitle}
                      </span>
                      {day.cardioIncluded && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          +CÁRDIO
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                      {day.title}
                    </p>
                    <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>⏱ {day.durationGoal.split(' ')[0]} min</span>
                      <span className={doneCount === day.exercises.length ? 'text-emerald-400 font-bold' : ''}>
                        {doneCount}/{day.exercises.length} feitos
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Cabeçalho do Treino Selecionado */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {currentDayObj.shortTitle} • Tempo Alvo: {currentDayObj.durationGoal}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                    {currentDayObj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">{currentDayObj.subtitle}</p>
                </div>
                <div className="bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 max-w-md">
                  <strong className="text-amber-400 block mb-0.5">🔥 Aquecimento Articular Obrigatório:</strong>
                  {currentDayObj.warmupNote}
                </div>
              </div>

              {/* Lista de Exercícios do Dia */}
              <div className="space-y-4">
                {currentDayObj.exercises.map((ex, index) => {
                  const isDone = !!completedExercisesToday[ex.id];
                  const inputState = exerciseInputs[ex.id] || { load: ex.defaultLoad, reps: 10 };

                  return (
                    <div
                      key={ex.id}
                      className={`rounded-2xl border p-4 transition ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Info do Exercício */}
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center">
                              {index + 1}
                            </span>
                            <h4
                              className={`text-base sm:text-lg font-bold ${
                                isDone ? 'line-through text-slate-400' : 'text-white'
                              }`}
                            >
                              {ex.name}
                            </h4>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-slate-700">
                              {ex.muscle}
                            </span>
                          </div>

                          {/* Badges de Séries, Repetições e Descanso */}
                          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                            <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-slate-200">
                              Séries: <span className="text-emerald-400 font-bold">{ex.sets}</span>
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-slate-200">
                              Meta: <span className="text-amber-400 font-bold">{ex.reps}</span>
                            </div>
                            <button
                              onClick={() => startRestTimer(ex.restSeconds)}
                              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-semibold transition cursor-pointer"
                              title="Clique para disparar o timer de descanso deste exercício"
                            >
                              <Timer className="w-3.5 h-3.5" />
                              Descanso: {ex.restSeconds}s (Iniciar)
                            </button>
                          </div>

                          {/* Nota Técnica de Proteção Articular */}
                          <div className="p-2.5 rounded-xl bg-amber-950/25 border border-amber-500/25 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2">
                            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{ex.jointNote}</span>
                          </div>
                        </div>

                        {/* Controles: Carga, Reps, Salvar & Botão YouTube */}
                        <div className="flex flex-col sm:flex-row lg:flex-col justify-between gap-2.5 shrink-0 lg:w-72 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                          {/* Inputs de Carga e Reps */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                Carga (kg)
                              </label>
                              <input
                                type="number"
                                value={inputState.load}
                                onChange={(e) => handleInputChange(ex.id, 'load', e.target.value)}
                                className="w-full bg-transparent text-white font-bold text-base focus:outline-none mt-0.5"
                              />
                            </div>
                            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                Reps Feitas
                              </label>
                              <input
                                type="number"
                                value={inputState.reps}
                                onChange={(e) => handleInputChange(ex.id, 'reps', e.target.value)}
                                className="w-full bg-transparent text-white font-bold text-base focus:outline-none mt-0.5"
                              />
                            </div>
                          </div>

                          {/* Botões de Ação */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleLogExercise(ex)}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-xs transition cursor-pointer shadow-md"
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                              Registrar & Descansar
                            </button>

                            <button
                              onClick={() => toggleExerciseDone(ex.id)}
                              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                              }`}
                              title="Marcar / Desmarcar exercício como concluído"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Link Direto YouTube (Corrigido para usar <Play />) */}
                          <a
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                              ex.youtubeQuery
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-600/15 hover:bg-red-600/25 border border-red-500/30 text-red-300 font-bold text-xs transition"
                          >
                            <Play className="w-4 h-4 text-red-500" />
                            Ver Execução no YouTube
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bloco de Cárdio TAF quando aplicável (Terça e Quinta) */}
              {currentDayObj.cardioIncluded && currentDayObj.cardioProtocol && (
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                        <Flame className="w-4 h-4" />
                        Bloco Final da Sessão • Específico TAF Policial
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {currentDayObj.cardioProtocol.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {currentDayObj.cardioProtocol.description}
                      </p>
                    </div>
                    <a
                      href="https://www.youtube.com/results?search_query=como+treinar+corrida+12+minutos+teste+de+cooper+taf+policial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-200 font-bold text-xs transition"
                    >
                      <Play className="w-4 h-4 text-red-400" />
                      Dicas Corrida TAF
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            ABA 2: PROGRESSÃO DE CARGAS, PESO CORPORAL & SIMULADO TAF
           =================================================================== */}
        {activeTab === 'progressao' && (
          <div className="space-y-6">
            {/* 1. GRÁFICO DE PROGRESSÃO DE CARGA POR EXERCÍCIO */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Sobrecarga Progressiva
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    Gráfico de Evolução de Cargas e Volume
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Cada vez que você clica em &ldquo;Registrar & Descansar&rdquo; na aba de Treinos, o gráfico atualiza automaticamente.
                  </p>
                </div>

                <div className="w-full md:w-80">
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Selecione o Exercício:
                  </label>
                  <select
                    value={selectedChartExercise}
                    onChange={(e) => setSelectedChartExercise(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    {allExercisesList.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        [{ex.dayTitle}] {ex.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="h-72 w-full bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredExerciseLogs}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#10b981" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#f8fafc'
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="load"
                      name="Carga (kg)"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#10b981' }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="volume"
                      name="Volume da Série (kg × reps)"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 4, fill: '#f59e0b' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 2. PAINEL DE METAS E SIMULADOS DO TAF POLICIAL (41 ANOS) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Preparação Concurso Policial (Faixa 40+ Anos)
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    Índices de Aprovação no TAF Policial
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Acompanhe seus índices rumo à aprovação com margem de segurança.
                  </p>
                </div>
              </div>

              {/* Cards dos 4 Testes do TAF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  {
                    label: 'Barra Fixa (Dinâmica)',
                    current: latestTaf.pullups,
                    goal: 5,
                    unit: 'reps',
                    color: 'emerald'
                  },
                  {
                    label: 'Flexão de Braços (1 min)',
                    current: latestTaf.pushups,
                    goal: 28,
                    unit: 'reps',
                    color: 'emerald'
                  },
                  {
                    label: 'Abdominal Remador (1 min)',
                    current: latestTaf.situps,
                    goal: 36,
                    unit: 'reps',
                    color: 'emerald'
                  },
                  {
                    label: 'Corrida 12 min (Cooper)',
                    current: latestTaf.runMeters,
                    goal: 2200,
                    unit: 'metros',
                    color: 'amber'
                  }
                ].map((item, idx) => {
                  const pct = Math.min(100, Math.round((item.current / item.goal) * 100));
                  return (
                    <div
                      key={idx}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">{item.label}</span>
                        <Award
                          className={`w-4 h-4 ${
                            pct >= 100 ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        />
                      </div>
                      <div className="my-2">
                        <span className="text-2xl font-extrabold text-white">{item.current}</span>{' '}
                        <span className="text-xs text-slate-400">
                          / meta {item.goal} {item.unit}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            pct >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1.5 font-semibold">
                        Prontidão: {pct}% {pct >= 100 ? '✅ Apto!' : 'em evolução'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Formulário para registrar novo Simulado TAF */}
              <form
                onSubmit={handleAddTafLog}
                className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 mb-5"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  + Registrar Novo Simulado TAF
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Barra Fixa (reps)</label>
                    <input
                      type="number"
                      placeholder={String(latestTaf.pullups)}
                      value={newTafInput.pullups}
                      onChange={(e) => setNewTafInput({ ...newTafInput, pullups: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Flexão (1 min)</label>
                    <input
                      type="number"
                      placeholder={String(latestTaf.pushups)}
                      value={newTafInput.pushups}
                      onChange={(e) => setNewTafInput({ ...newTafInput, pushups: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Abdominal (1 min)</label>
                    <input
                      type="number"
                      placeholder={String(latestTaf.situps)}
                      value={newTafInput.situps}
                      onChange={(e) => setNewTafInput({ ...newTafInput, situps: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Corrida 12m (metros)</label>
                    <input
                      type="number"
                      placeholder={String(latestTaf.runMeters)}
                      value={newTafInput.runMeters}
                      onChange={(e) => setNewTafInput({ ...newTafInput, runMeters: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm transition cursor-pointer"
                    >
                      Salvar TAF
                    </button>
                  </div>
                </div>
              </form>

              {/* Gráfico de Corrida Cooper e Repetições TAF */}
              <div className="h-64 w-full bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tafLogs}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#10b981" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#f8fafc'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="pullups" name="Barra Fixa" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="pushups" name="Flexões" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="situps" name="Abdominal Remador" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="runMeters" name="Cooper (Metros)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 3. RASTREADOR DE PESO CORPORAL (110 KG -> META 92 KG) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Recomposição Corporal (Queima de Gordura + Massa Magra)
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    Curva de Redução de Peso (Início: 110 kg)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Cada kg de gordura eliminado reduz em 4 kg a sobrecarga de impacto no seu quadril durante a corrida e facilita a Barra Fixa!
                  </p>
                </div>

                <form onSubmit={handleAddWeightLog} className="flex flex-wrap items-end gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Novo Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 107.5"
                      value={newWeightInput}
                      onChange={(e) => setNewWeightInput(e.target.value)}
                      className="w-28 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Cintura (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="Ex: 104"
                      value={newWaistInput}
                      onChange={(e) => setNewWaistInput(e.target.value)}
                      className="w-28 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm transition cursor-pointer"
                  >
                    Registrar
                  </button>
                </form>
              </div>

              <div className="h-64 w-full bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightLogs}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis domain={['dataMin - 5', 'dataMax + 2']} stroke="#10b981" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#f8fafc'
                      }}
                    />
                    <Legend />
                    <ReferenceLine y={95} label={{ value: 'Meta TAF Ideal (95kg)', fill: '#10b981', fontSize: 11 }} stroke="#10b981" strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      name="Peso Corporal (kg)"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="waist"
                      name="Circunferência Abdominal (cm)"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            ABA 3: DIETA SII (LOW FODMAP | 4 REFEIÇÕES | ALTA PROTEÍNA)
           =================================================================== */}
        {activeTab === 'dieta' && (
          <div className="space-y-6">
            {/* Painel de Macros e Hidratação */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Estratégia Nutricional • 41 Anos | 1,77m | 110kg
                    </span>
                    <h2 className="text-lg font-extrabold text-white">
                      Meta Diária: Recomposição Corporal & SII-Safe
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setCheckedMeals({});
                      showToast('Refeições do dia reiniciadas!');
                    }}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    Zerar Dia
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Calorias</span>
                    <div className="text-lg font-extrabold text-white mt-0.5">
                      {consumedMacros.calories} <span className="text-xs text-slate-400">/ 2.250 kcal</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">Déficit Tático (-650 kcal)</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Proteínas</span>
                    <div className="text-lg font-extrabold text-emerald-400 mt-0.5">
                      {consumedMacros.protein}g <span className="text-xs text-slate-400">/ 218g</span>
                    </div>
                    <span className="text-[10px] text-slate-400">~2,0g/kg (Hipertrofia)</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Carboidratos</span>
                    <div className="text-lg font-extrabold text-amber-400 mt-0.5">
                      {consumedMacros.carbs}g <span className="text-xs text-slate-400">/ 175g</span>
                    </div>
                    <span className="text-[10px] text-slate-400">100% Low FODMAP</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Gorduras Boas</span>
                    <div className="text-lg font-extrabold text-sky-400 mt-0.5">
                      {consumedMacros.fats}g <span className="text-xs text-slate-400">/ 72g</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Suporte Testosterona</span>
                  </div>
                </div>
              </div>

              {/* Rastreador de Água (Meta 4,2L para 110kg) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1">
                      <Droplets className="w-4 h-4" /> Hidratação SII & Performance
                    </span>
                    <span className="text-xs font-bold text-slate-400">Meta: 4.200 ml</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white">{waterIntakeMl} ml</span>
                    <span className="text-xs text-sky-400 font-semibold">
                      ({Math.min(100, Math.round((waterIntakeMl / 4200) * 100))}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden my-2 border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${Math.min(100, (waterIntakeMl / 4200) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setWaterIntakeMl((w) => w + 300)}
                    className="flex-1 py-2 px-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-bold text-xs cursor-pointer transition"
                  >
                    + 300ml (Copo)
                  </button>
                  <button
                    onClick={() => setWaterIntakeMl((w) => w + 500)}
                    className="flex-1 py-2 px-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-bold text-xs cursor-pointer transition"
                  >
                    + 500ml (Garrafa)
                  </button>
                  <button
                    onClick={() => setWaterIntakeMl(0)}
                    className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs cursor-pointer"
                    title="Zerar água"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Guia Rápido SII (Verde vs Vermelho) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Alimentos Base do Seu Cardápio (Seguros para SII)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Carboidratos Limpos:</strong> Arroz branco, cuscuz de milho, batata inglesa, mandioca/aipim, abóbora cabotiá e aveia (até 50g).{' '}
                  <strong>Proteínas:</strong> Ovos, peito de frango, cortes bovinos magros (patinho, acém, coxão mole), tilápia, atum e Whey Isolado/Hidrolisado.{' '}
                  <strong>Temperos:</strong> Sal, azeite extravirgem, cúrcuma, orégano, alecrim, gengibre e cebolinha verde.
                </p>
              </div>

              <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-4">
                <h3 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Gatilhos FODMAP Eliminados (Evitam Estufamento e Gases)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Evitar estritamente na preparação:</strong> Leite comum e Whey Concentrado com lactose, trigo em excesso (pão francês/macarrão comum), feijão/lentilha/grão-de-bico, alho e cebola in natura ou em pó, maçã, pera, mel e adoçantes terminados em &ldquo;ol&rdquo; (xilitol, sorbitol, maltitol).
                </p>
              </div>
            </div>

            {/* As 4 Refeições Detalhadas */}
            <div className="space-y-4">
              {SII_MEALS.map((meal) => {
                const isChecked = !!checkedMeals[meal.id];
                return (
                  <div
                    key={meal.id}
                    className={`rounded-2xl border p-4 sm:p-5 transition ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/50'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <button
                          onClick={() =>
                            setCheckedMeals((prev) => ({ ...prev, [meal.id]: !prev[meal.id] }))
                          }
                          className={`mt-1 sm:mt-0 w-7 h-7 rounded-xl flex items-center justify-center border transition cursor-pointer shrink-0 ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-emerald-500'
                          }`}
                        >
                          {isChecked ? <Check className="w-4 h-4 stroke-[3]" /> : <Circle className="w-4 h-4" />}
                        </button>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                              {meal.number}
                            </span>
                            <span className="text-xs text-slate-400 font-semibold">{meal.time}</span>
                          </div>
                          <h3
                            className={`text-base sm:text-lg font-extrabold mt-0.5 ${
                              isChecked ? 'line-through text-slate-400' : 'text-white'
                            }`}
                          >
                            {meal.title}
                          </h3>
                        </div>
                      </div>

                      {/* Badges de Macros da Refeição */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-bold">
                          🔥 {meal.calories} kcal
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
                          P: {meal.protein}g
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 font-bold">
                          C: {meal.carbs}g
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-sky-400 font-bold">
                          G: {meal.fats}g
                        </span>
                      </div>
                    </div>

                    {/* Itens do Prato */}
                    <ul className="space-y-2 mb-3">
                      {meal.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Substituição e Dica SII */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800/80 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
                        <strong className="text-emerald-400">🔄 Opção de Substituição: </strong>
                        {meal.substitutions}
                      </div>
                      <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/25 text-amber-200/90">
                        <strong className="text-amber-400">🛡️ Blindagem SII: </strong>
                        {meal.siiNote}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            ABA 4: SUPLEMENTAÇÃO & SAÚDE MASCULINA (41 ANOS)
           =================================================================== */}
        {activeTab === 'suplementos' && (
          <div className="space-y-6">
            {/* Cabeçalho do Protocolo */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Fisiologia Masculina 40+ • Articulações & Intestino
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  Protocolo Integrado de Suplementação
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fórmulas selecionadas para maximizar a testosterona endógena, recuperar o ombro direito e quadril, e nutrir a mucosa intestinal (SII).
                </p>
              </div>
              <button
                onClick={() => {
                  setCheckedSupplements({});
                  showToast('Checklist de suplementos reiniciado para hoje!');
                }}
                className="self-start sm:self-center shrink-0 text-xs px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              >
                Reiniciar Checklist Diário
              </button>
            </div>

            {/* Cards de Suplementos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUPPLEMENTS_DATA.map((sup) => {
                const isTaken = !!checkedSupplements[sup.id];
                return (
                  <div
                    key={sup.id}
                    onClick={() =>
                      setCheckedSupplements((prev) => ({ ...prev, [sup.id]: !prev[sup.id] }))
                    }
                    className={`rounded-2xl border p-4 transition cursor-pointer flex flex-col justify-between ${
                      isTaken
                        ? 'bg-emerald-950/25 border-emerald-500/50'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-slate-800">
                          {sup.block}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {sup.priority}
                        </span>
                      </div>

                      <div className="flex items-start gap-3 my-2">
                        <div
                          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 ${
                            isTaken
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'bg-slate-950 border-slate-700 text-slate-500'
                          }`}
                        >
                          {isTaken ? <Check className="w-4 h-4 stroke-[3]" /> : <Circle className="w-3.5 h-3.5" />}
                        </div>
                        <h3
                          className={`text-base font-extrabold ${
                            isTaken ? 'line-through text-slate-400' : 'text-white'
                          }`}
                        >
                          {sup.name}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mt-2 mb-3">
                        {sup.benefit}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-emerald-300 font-bold">
                        💊 Dose: <span className="text-white">{sup.dose}</span>
                      </div>
                      <div className="text-amber-300 font-semibold">
                        ⏰ {sup.timing}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          BARRA INFERIOR FIXA: TIMER DE DESCANSO RÁPIDO ENTRE SÉRIES
         ===================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md shadow-2xl">
        {/* Barra de progresso visual do descanso */}
        <div className="w-full h-1 bg-slate-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${restProgressPercent}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
          {/* Display do Timer de Descanso */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                isRestRunning
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold animate-pulse'
                  : 'bg-slate-950 text-white border-slate-800 font-bold'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span className="font-mono text-base sm:text-lg">{formatTime(restSeconds)}</span>
            </div>

            <div className="hidden sm:block">
              <div className="text-xs font-bold text-white">Timer de Descanso</div>
              <div className="text-[11px] text-slate-400">
                {isRestRunning ? 'Descansando para a próxima série...' : 'Clique no tempo desejado'}
              </div>
            </div>
          </div>

          {/* Botões Rápidos de Descanso */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            {[45, 60, 90, 120].map((sec) => (
              <button
                key={sec}
                onClick={() => startRestTimer(sec)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                  restTotal === sec && isRestRunning
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                }`}
              >
                {sec}s
              </button>
            ))}

            <button
              onClick={() => setIsRestRunning(!isRestRunning)}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold transition cursor-pointer"
              title="Iniciar / Pausar Descanso"
            >
              {isRestRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                setIsRestRunning(false);
                setRestSeconds(restTotal);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="Resetar Descanso"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                soundEnabled
                  ? 'bg-slate-800 border-slate-700 text-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
              title="Ativar / Desativar Som de Alerta"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL: INSTALAR APP / CRIAR ATALHO NA TELA + BACKUP DE DADOS
         ===================================================================== */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-extrabold text-white">
                  Instalar App na Tela & Backup
                </h3>
              </div>
              <button
                onClick={() => setShowInstallModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Botão Nativo PWA caso o navegador suporte */}
            {deferredPrompt && (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-between gap-3">
                <div className="text-xs text-emerald-200">
                  <strong>Instalação Direta Disponível!</strong> Clique ao lado para instalar o atalho oficial no seu dispositivo.
                </div>
                <button
                  onClick={async () => {
                    deferredPrompt.prompt();
                    await deferredPrompt.userChoice;
                    setDeferredPrompt(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs shrink-0 cursor-pointer"
                >
                  Instalar Agora
                </button>
              </div>
            )}

            {/* Passo a Passo para Celular e Computador */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-emerald-400 mb-1">📱 No Android (Google Chrome):</h4>
                <p>
                  Toque nos <strong>3 pontinhos (⋮)</strong> no canto superior direito do navegador e selecione{' '}
                  <strong>&ldquo;Adicionar à tela inicial&rdquo;</strong> ou <strong>&ldquo;Instalar aplicativo&rdquo;</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-sky-400 mb-1">🍏 No iPhone / iOS (Safari):</h4>
                <p>
                  Toque no botão <strong>Compartilhar (ícone de quadrado com seta para cima)</strong> na barra inferior e escolha{' '}
                  <strong>&ldquo;Adicionar à Tela de Início&rdquo;</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-amber-400 mb-1">💻 No Computador (Chrome / Edge):</h4>
                <p>
                  Clique no ícone de <strong>Instalar (computador com seta)</strong> no canto direito da barra de endereços ou pressione{' '}
                  <strong>Ctrl + D</strong> para fixar nos favoritos.
                </p>
              </div>
            </div>

            {/* Gerenciador de Backup (Exportar / Importar JSON) */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Sincronizar ou Fazer Backup dos Seus Dados (PC ↔ Celular)
              </h4>
              <p className="text-xs text-slate-400">
                Seus dados ficam salvos automaticamente neste aparelho. Para transferir seu histórico do computador para o celular, exporte o arquivo e importe no outro dispositivo:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportData}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs cursor-pointer transition"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  Exportar Backup (.JSON)
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs cursor-pointer transition"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  Importar Backup (.JSON)
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </div>
            </div>

            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-sm cursor-pointer transition"
            >
              Entendido, Voltar ao Treino
            </button>
          </div>
        </div>
      )}
    </div>
  );
}