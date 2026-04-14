export const resumeData = {
  name: "Mohammed Eisa",
  title: "AI Engineer",
  location: "Bangalore, India",
  email: "mdeisakangod@gmail.com",
  github: "github.com/eisaexe",
  linkedin: "linkedin.com/in/eisaexe",

  education: [
    {
      degree: "B.Tech in Computer Science Engineering (AI and ML)",
      institution: "Presidency University",
      location: "Bangalore, India",
      year: "2021 – 2025",
      gpa: "7.2 / 10",
      highlights: ["Specialization in Artificial Intelligence & Machine Learning", "Final year project: Autonomous Document Intelligence Platform"]
    }
  ],

  experience: [
    {
      role: "AI/ML Trainee",
      company: "ALTIMETRIK",
      period: "Jan 2025 – Present",
      duration: "4+ months",
      location: "Bangalore, India",
      responsibilities: [
        "Built multi-agent AI pipelines for document intelligence automation",
        "Developed RAG-based systems using LangChain and vector databases",
        "Integrated LLMs (GPT-4, Gemini) via REST APIs for enterprise solutions",
        "Created Insurance Fraud Detection dashboard with ML models",
        "Worked on MCP (Model Context Protocol) integrations for AI workflows"
      ]
    }
  ],

  skills: {
    languages: ["Python", "C#", "JavaScript", "SQL"],
    ai_ml: ["LLMs", "RAG", "LangChain", "Hugging Face", "Transformers", "FAISS", "ChromaDB"],
    frameworks: ["FastAPI", "React", "Flask", "Streamlit"],
    cloud: ["AWS", "Azure (basics)"],
    tools: ["Git", "Docker", "Jupyter", "VS Code"],
    protocols: ["REST APIs", "MCP (Model Context Protocol)", "GraphQL"]
  },

  projects: [
    {
      name: "Autonomous Document Intelligence Platform (IDP)",
      description: "Multi-agent AI system that extracts, classifies, and reasons over documents using RAG pipelines and LLMs. Reduces manual document processing by 85%.",
      tech: ["Python", "LangChain", "GPT-4", "FastAPI", "ChromaDB", "RAG"],
      highlights: ["Multi-agent orchestration", "85% reduction in manual processing", "Real-time document Q&A"],
      type: "enterprise"
    },
    {
      name: "Insurance Fraud Analysis Dashboard",
      description: "ML-powered dashboard that detects fraudulent insurance claims using anomaly detection and pattern recognition. Built for SLK Software.",
      tech: ["Python", "Scikit-learn", "Streamlit", "Pandas", "XGBoost"],
      highlights: ["Real-time fraud scoring", "Interactive visualizations", "93% detection accuracy"],
      type: "analytics"
    },
    {
      name: "Travel Itinerary Generator",
      description: "AI-powered travel planner using Google Gemini API that generates personalized multi-day itineraries based on user preferences.",
      tech: ["Python", "Gemini API", "React", "REST API"],
      highlights: ["Gemini Pro integration", "Personalized recommendations", "Multi-city planning"],
      type: "generative"
    }
  ],

  certifications: [
    { name: "AWS Introduction to Machine Learning", issuer: "Amazon Web Services", year: "2024", image: null, color: "#f59e0b" },
    { name: "Data Science Certification", issuer: "Great Learning", year: "2023", image: "/src/assets/data s.jpg", color: "#00ffaa" },
    { name: "Relational Database Design", issuer: "Udemy", year: "2023", image: "/src/assets/rdbms.jpg", color: "#00eeff" },
    { name: "Introduction to DevOps", issuer: "Udemy", year: "2023", image: "/src/assets/devops.jpg", color: "#7c5cfc" },
    { name: "Java", issuer: "Udemy", year: "2022", image: "/src/assets/java.jpg", color: "#f59e0b" },
    { name: "JavaScript & jQuery Basics", issuer: "Udemy", year: "2022", image: "/src/assets/jquery beginers.jpg", color: "#00ffaa" },
    { name: "SOLID Principles OOP & Architecture", issuer: "Udemy", year: "2023", image: "/src/assets/solid.jpg", color: "#f472b6" },
    { name: "Jenkins: Beginer to Pro", issuer: "Udemy", year: "2023", image: "/src/assets/jenkis.jpg", color: "#00ffaa" },
    { name: "HTML5 specialist", issuer: "Udemy", year: "2023", image: "/src/assets/html5.jpg", color: "#f59e0b" },
    { name: "Jira Essentials 2025", issuer: "Udemy", year: "2025", image: "/src/assets/jira.jpg", color: "#7c5cfc" },
    { name: "Maven: Quick Start", issuer: "Udemy", year: "2025", image: "/src/assets/into to maven.jpg", color: "#00eeff" }
  ]
};

// Knowledge base for chatbot Q&A
export const knowledgeBase = [
  {
    keywords: ["name", "who", "Mohammed", "Eisa"],
    answer: "I'm Mohammed Eisa, an AI Engineer specializing in LLMs, RAG systems, and multi-agent AI. Currently an AI/ML Trainee at SLK Software and pursuing B.Tech in CSE (AI & ML) at Presidency University.",
    effect: null
  },
  {
    keywords: ["python", "Python"],
    answer: "Python is my primary language! I use it extensively for AI/ML development — building RAG pipelines, LangChain agents, FastAPI backends, and ML models. Check out my IDP and Fraud Detection projects for real-world usage.",
    effect: "python"
  },
  {
    keywords: ["rag", "RAG", "retrieval", "vector", "embedding"],
    answer: "RAG (Retrieval-Augmented Generation) is my specialty! I've built production-grade RAG systems using LangChain, ChromaDB, and FAISS for the Autonomous Document Intelligence Platform at SLK Software. These systems ground LLM responses in real document data.",
    effect: "rag"
  },
  {
    keywords: ["llm", "LLM", "language model", "gpt", "GPT", "gemini", "Gemini", "ai", "artificial intelligence"],
    answer: "I work with LLMs daily! I've integrated GPT-4 and Google Gemini API into production systems. My Travel Itinerary Generator uses Gemini Pro, and the IDP platform orchestrates GPT-4 across multi-agent workflows.",
    effect: "llm"
  },
  {
    keywords: ["mcp", "MCP", "model context", "protocol"],
    answer: "MCP (Model Context Protocol) is a cutting-edge protocol for standardizing how AI models interact with tools and data sources. I've worked on MCP integrations at SLK Software to create more robust AI workflows.",
    effect: "llm"
  },
  {
    keywords: ["c#", "C#", "csharp", "dotnet", ".net"],
    answer: "C# is in my toolkit for building enterprise-grade backend systems and integrations, particularly for .NET-based workflows at SLK Software.",
    effect: "python"
  },
  {
    keywords: ["rest", "REST", "api", "API", "endpoint"],
    answer: "I design and consume REST APIs extensively. Built FastAPI backends for the IDP platform, integrated Gemini and OpenAI APIs, and created RESTful services for enterprise AI applications.",
    effect: "python"
  },
  {
    keywords: ["experience", "work", "job", "slk", "SLK", "trainee"],
    answer: "I'm currently an AI/ML Trainee at SLK Software (Jan 2025–Present). My work focuses on multi-agent AI pipelines, RAG systems, LLM integrations, and building the Fraud Detection dashboard.",
    effect: null
  },
  {
    keywords: ["education", "university", "presidency", "btech", "degree", "college"],
    answer: "I'm pursuing B.Tech in Computer Science Engineering with a specialization in AI & ML at Presidency University, Bangalore (2021–2025), with a GPA of 8.2/10.",
    effect: null
  },
  {
    keywords: ["project", "projects", "built", "portfolio"],
    answer: "My key projects: 1) Autonomous Document Intelligence Platform (multi-agent RAG system), 2) Insurance Fraud Detection Dashboard (ML + Streamlit), 3) Travel Itinerary Generator (Gemini API). Ask me about any of them!",
    effect: "python"
  },
  {
    keywords: ["idp", "IDP", "document", "intelligence"],
    answer: "The Autonomous Document Intelligence Platform is my flagship project — a multi-agent AI system using RAG, LangChain, and GPT-4 that automates document extraction and reasoning, reducing manual work by 85%.",
    effect: "rag"
  },
  {
    keywords: ["fraud", "insurance", "dashboard", "detection"],
    answer: "The Insurance Fraud Analysis Dashboard uses XGBoost and Scikit-learn to detect fraudulent claims with 93% accuracy. It features real-time fraud scoring and interactive Streamlit visualizations.",
    effect: "llm"
  },
  {
    keywords: ["travel", "itinerary", "gemini", "Gemini"],
    answer: "The Travel Itinerary Generator uses Google Gemini Pro API to create personalized multi-day travel plans. Users input preferences and destinations, and Gemini crafts detailed day-by-day itineraries.",
    effect: "python"
  },
  {
    keywords: ["certification", "aws", "AWS", "certified", "great learning"],
    answer: "I hold two certifications: AWS Introduction to Machine Learning (Amazon Web Services, 2024) and Data Science Certification (Great Learning, 2023).",
    effect: null
  },
  {
    keywords: ["skill", "skills", "tech", "stack", "technology"],
    answer: "My tech stack: Python, C#, LLMs (GPT-4, Gemini), RAG, LangChain, FastAPI, React, REST APIs, MCP, ChromaDB, FAISS, Scikit-learn, XGBoost, and AWS. I specialize in AI/ML engineering.",
    effect: "python"
  },
  {
    keywords: ["langchain", "LangChain", "chain", "agent"],
    answer: "LangChain is my go-to framework for building agentic AI systems. I've used it to create multi-agent orchestration pipelines, RAG chains, and tool-using agents in the IDP platform.",
    effect: "rag"
  },
  {
    keywords: ["hire", "available", "contact", "reach"],
    answer: "Mohammed is open to exciting AI engineering opportunities! You can reach him on GitHub or LinkedIn. He's passionate about building intelligent systems that solve real-world problems.",
    effect: null
  }
];
