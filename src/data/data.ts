import {
  Age,
  Data,
  DateOfBirth,
  TimePoint,
  Contact,
  Skill,
  Location,
  ProgrammingLanguage,
  Education,
  Interval,
  Grades,
  Course,
  Thesis,
  Work,
  Project,
  Achievement,
  Membership,
  Publication,
  PublicationCategories,
  TestSection,
  Certificate,
  ContactType,
  Hackathon,
} from "./types";

export function initData(): Data {
  // Personal info
  const firstName = "Jakub";
  const lastName = "Rada";
  const degreesBeforeName = ["Ing."];
  const titles = ["AI/ML Master Graduate", "Researcher", "Software Engineer"];

  const dateOfBirth = new DateOfBirth("Date of birth", "fa-solid fa-cake-candles", new TimePoint(2000, 2, 25));
  const age = new Age("Age", "fa-solid fa-calendar-days");
  const location = new Location("Location", "fa-solid fa-map-location-dot", "Prague", "Czechia", true);

  const education = [
    "I am a Computer Science Master Graduate specializing in Artificial Intelligence at Czech Technical University in Prague.",
    "My main interests are Reinforcement and Machine Learning, Computer Vision, Quantum Computing and Optimization, as well as probably any topic in Artificial Intelligence.",
    "I completed both Bachelor degree and the following Master degree with honours, with converted GPA 3.87/4.0.",
    "My Bachelor thesis, titled Comparing Exploration Methods in Partially Observable Stochastic Games, was trying to apply multi-armed bandit algorithms to partially observable stochastic games as a means of solving the exploration-exploitation trade-off and improving scalability of known algorithms. Thereofore, it was combining reinforcement learning and advanced game theory.",
    "In my Master's thesis, titled Probabilistic Modelling for Robust Scoring and Estimation of Geometric Relations, which focused on 3D computer vision and inventing new scoring functions for the RANSAC algorithm, specifically for relative pose estimation. It combined probabilistic modelling, maximum-likelihood estimation, EM algorithm and many more advanced methods of machine learning and optimization. From the results we have been able to introduce a model that can handle anisotropic residual errors and improve the precision of refined essential matrix.",
    "For both theses I received the Dean's award for exceptional theses, which is awarded to only a few students every year.",
    "For my study achievements I was invited as a member of Upsilon Pi Epsilon, the first honour society in Computer Science.",
  ];

  const beginnings = [
    "My journey to this field began when I was very young.",
    "I started programming when I was 8 years old in a graphical programming language Baltie 3, which served as one of the inspirations for the well-known language Scratch originating at MIT.",
    "In this language, I competed at both national and international levels and at the age of 11 I placed second in the Czech national round and a few months later third in the final Central-European round.",
  ];

  const other = [
    "Apart from school, I have a lot of experience in the field.",
    "For most of my time at university, I was working as a part-time software engineer and worked on various projects from complex web applications for major financial corporations in the Czech Republic, to a new mobile app to organize events and group people.",
    "Doing this further refined my programming and engineering skills making me proficient in many languages and being able to built complex maintainable software as well as design AI and ML pipelines.",
    "Also, I participated in some research projects.",
    "Apart from working on my theses, each for a year in total, I developed together with my friend a new metaheuristic algorithm for combinatorial optimisation, which then placed second in well-known international competition ROADEF 2020. We publised the solution as a paper in the Journal of Heuristics.",
    "Nevertheless, I participated in two big hackathons.",
    "First one in Paris, the Mistral AI Game Jam, where we built an AI-powered game, where the user interacts with an AI agent through text and voice and tries to steer his actions to achieve the goal. In tough competition we made it to the final round of top 6 teams.",
    "The second one was in Prague, Rakathon, the first hackathon in the Czech Republic meant to help cancer patients.",
    "In 12 hours, I built a web app that help patients and doctors to share information easily and efficiently, as well as results of various treatments, leading to big savings in doctor's time which can be invested in other patients to reduce waiting times.",
    "The panel of doctors and representatives of leading pharmaceutical companies, like Astra Zeneca or Novartis, were impressed by the solution and we placed second in the competition.",
  ];

  const expertise = [
    "During my studies and work, I gained extensive theoretical and practical knowledge about programming, the complex underlying math and theory, building AI/ML pipelines, including designing model architectures and training them on real data to solve various tasks.",
    "I have experience in quantum computing, I even implemented my own quantum circuit simulator in Python, similar in qiskit in functionality. I know symbolic and statistical machine learning, computer vision and image processing, both continuous and combinatorial optimization, logic and formal methods, planning methods and a little bit about robotics.",
    "I also have expreience in software engineering and building software both from scratch or starting from existing codebases.",
    "I am meticulous and detail-oriented, passionate and always striving to learn and improve my skills and abilities.",
    "From hackathons and various competitions, I am confident that I can work under pressure and quickly test and implement ideas.",
  ];

  const extracurricular = [
    "In my free time, I enjoy running, lifting weights, reading books, both sci-fi fiction and non-fiction, travelling and coding to explore my new ideas about products and apps that would help me and other people.",
  ];

  const aboutMe = [
    ["Education", education.join(" ")],
    ["Beginnings", beginnings.join(" ")],
    ["Other activities", other.join(" ")],
    ["Knowledge and experience", expertise.join(" ")],
    ["Extracurricular", extracurricular.join(" ")],
  ];

  const goals =
    "I love learning new things and constantly improving my skills and abilities. I am interested in Artificial Intelligence, especially Reinforcement Learning, Machine Learning, Quantum Computing and Optimization and I want to contribute to pushing the boundaries of what is possible. I believe these fields can help us solve many important problems in this world and I want to be a part of it.";

  // contacts
  const web = new Contact("Website", "fa-solid fa-globe", ContactType.web, "www.jakubrada.com", "https://jakubrada.com");
  const phone = new Contact("Phone number", "fa-solid fa-mobile", ContactType.phone, "+420 604 730 409", "tel:+420604730409");
  const email = new Contact("Email address", "fa-solid fa-envelope", ContactType.email, "jakubrada@icloud.com", "mailto:jakubrada@icloud.com");
  const github = new Contact("GitHub", "fa-brands fa-github", ContactType.github, "radajakub", "https://github.com/radajakub");
  const linkedin = new Contact("LinkedIn", "fa-brands fa-linkedin", ContactType.linkedin, "radajakub", "https://www.linkedin.com/in/radajakub");
  const discord = new Contact("Discord", "fa-brands fa-discord", ContactType.discord, "jakubrada", "", false);
  const leetcode = new Contact("LeetCode", "", ContactType.leetcode, "jakubrada", "https://leetcode.com/jakubrada", false);
  const hackerrank = new Contact("HackerRank", "fa-brands fa-hackerrank", ContactType.hackerrank, "jakubrada", "https://www.hackerrank.com/jakubrada", false);
  const kaggle = new Contact("Kaggle", "fa-brands fa-kaggle", ContactType.kaggle, "radajakub", "https://www.kaggle.com/radajakub", false);
  const contacts = new Map([
    [ContactType.web, web],
    [ContactType.phone, phone],
    [ContactType.email, email],
    [ContactType.github, github],
    [ContactType.linkedin, linkedin],
    [ContactType.discord, discord],
    [ContactType.leetcode, leetcode],
    [ContactType.hackerrank, hackerrank],
    [ContactType.kaggle, kaggle],
  ]);

  // skills
  const langauges = new Skill("Languages", "fa-solid fa-language", ["Czech", "English", "Spanish"]);
  const interests = new Skill("Interests", "fa-solid fa-heart", ["Running", "Lifting Weights", "Learning", "Coding", "Reading"]);
  const programming = new Skill("Programming Languages", "fa-solid fa-code", [
    "C/C++",
    "Python",
    "Julia",
    "Javascript/Typescript",
    "Rust",
    "Haskell",
    "Java",
    "Dart",
    "HTML/CSS",
  ]);
  const frameworks = new Skill("Application Frameworks", "fa-brands fa-app-store-ios", ["Flutter", "Vue.js", "Angular", "Django", "NodeJS", "Docker"]);
  const ai = new Skill("AI/ML Tools", "fa-solid fa-brain", [
    "PyTorch",
    "NumPy",
    "JAX",
    "scikit-learn",
    "DeepMind Control Suite",
    "Gurobi",
    "PySAT",
    "HuggingFace",
    "Transformers",
  ]);
  const traits = new Skill("Skills and Traits", "fa-solid fa-person", ["Dilligence", "Adaptability", "Perfectionism", "Problem solving", "Responsibilility"]);
  const skills = [langauges, interests, programming, frameworks, ai, traits];

  // programming languages
  const julia = new ProgrammingLanguage("Julia");
  const typescript = new ProgrammingLanguage("Typescript");
  const c = new ProgrammingLanguage("C");
  const cpp = new ProgrammingLanguage("C++");
  const python = new ProgrammingLanguage("Python");
  const matlab = new ProgrammingLanguage("Matlab");
  const html = new ProgrammingLanguage("HTML");
  const css = new ProgrammingLanguage("CSS");
  const javascript = new ProgrammingLanguage("Javascript");
  const flutter = new ProgrammingLanguage("Flutter");
  const node = new ProgrammingLanguage("NodeJS");
  const angular = new ProgrammingLanguage("Angular");
  const vue = new ProgrammingLanguage("Vue.js");
  const dart = new ProgrammingLanguage("Dart");
  const django = new ProgrammingLanguage("Django");
  const docker = new ProgrammingLanguage("Docker");
  const android = new ProgrammingLanguage("Android");
  const ios = new ProgrammingLanguage("iOS");
  const baltie3 = new ProgrammingLanguage("Baltie 3");
  const java = new ProgrammingLanguage("Java");
  const javafx = new ProgrammingLanguage("JavaFX");
  const latex = new ProgrammingLanguage("LaTeX");
  const pytorch = new ProgrammingLanguage("PyTorch");
  const rust = new ProgrammingLanguage("Rust");
  const mistral = new ProgrammingLanguage("Mistral AI");
  const elevenLabs = new ProgrammingLanguage("Eleven Labs");
  const whisper = new ProgrammingLanguage("OpenAI whisper");
  const huggingFace = new ProgrammingLanguage("Hugging Face");

  // educations
  const alej = new Education(
    "Gymnázium, Praha 6, Nad Alejí 1952",
    "GNA",
    "",
    "General High School for students aiming to attend a university",
    Interval.build(2011, 9, 1, 2019, 6, 14),
    "High School",
    "logo_alej.png",
    "https://www.alej.cz/about-school/",
    "One of the best High Schools in the Czech Republic providing great fundamentals in Math, Natural Sciences and Social Sciences",
    "Gymnázium, Praha 6, Nad Alejí 1952 is a prestigious General High School located in Prague in the Czech Republic. It is regularly at the top of leaderboards in the final exam results in the whole country. The vast majority of students attending this school get accepted to Czech universities in both technical and social fields. I passed most of the years with straight 1's (a Czech equivalent of A on a (1-5) scale) and every year with honours (grade average below 1.5). I graduated in Math, Computer Science, English and mandatory Czech language with straight 1's. Moreover, I presented my final Computer Science project, a flash-card web app. During my studies, I also passed the Cambridge First Certificate in English (FCE).",
    new Grades("1-5", true, [])
  );
  const feeBachelor = new Education(
    "Czech Technical University in Prague",
    "FEE CTU",
    "Faculty of Electrical Engineering",
    "Artificial Intelligence and Computer Science",
    Interval.build(2019, 6, 21, 2022, 6, 14),
    "Bachelor",
    "logo_cvut.jpg",
    "https://oi.fel.cvut.cz/en/",
    "Bachelor programme in Math, classic Computer Science topics, Optimisation and Artificial Intelligence",
    "Czech Technical University in Prague is one of the best technical universities in the Czech Republic with a long tradition. I studied an Open Informatics programme with a specialisation titled Introduction to Artificial Intelligence and Computer Science. The programme consists of Math, Computer Science, Optimization and Introduction to Artificial Intelligence and Machine Learning. Studies are finished with a State Exam, where students draw two questions from any course at random and have to present answers in front of a board of professors, and a Bachelor Thesis defence. I graduated with honours, meaning my GPA was below 1.5 (in the Czech Republic, letter grades are converted to a 1-4 scale), and results from both parts of the final exam were A's. My thesis also received the Dean's Award for exceptional theses.",
    new Grades(
      "1-4",
      true,
      [
        new Course("Evolutionary Optimization Algorithms", "Local Search, Evolutionary and Genetic Algorithms", "A", 6, 5),
        new Course("Optimization and Game Theory", "Convex Optimization, Duality, Normal Form Games", "A", 4, 6),
        new Course("Linear Algebra", "Introduction to Abstract Linear Algebra", "A", 7, 1),
        new Course("Logic and Graphs", "Propositional and Predicate Logic, Resolution, Graph Theory", "B", 5, 2),
        new Course("Mathematical Analysis 1", "One-dimensional Calculus", "C", 7, 2),
        new Course("Mathematical Analysis 2", "Multi-dimensional Calculus", "A", 7, 3),
        new Course("Probability and Statistics", "Probability Theory, Statistics, Markov Chains", "A", 7, 3),
        new Course("Optimization", "Optimization with Linear Algebra, Gradient methods, Linear Programming", "B", 7, 4),
        new Course("Computer Architectures", "Modern RISC Processor Design", "A", 5, 2),
        new Course("Database Systems", "Relation Databases, SQL, Relational Algebra", "A", 6, 4),
        new Course("Julia for Optimization and Learning", "Introduction to the Julia language and multiple dispatch approaches", "A", 4, 6),
        new Course("Programmin in Java", "Introduction to Object Oriented Programming and Java", "A", 6, 2),
        new Course("Procedural Programming", "Programming in C", "A", 6, 1),
        new Course("Discrete Mathematics", "Integers, Relations, Mappings, Induction and other proofs", "A", 5, 1),
        new Course("Languages, Automats and Gramatics", "Finite and Pushdown Automata, Languages, Turing Machines", "A", 6, 5),
        new Course("Numerical Analysis", "Numerical Algorithms for Interpolation, Integration, Equation Solving, ...", "A", 6, 3),
        new Course("Algorithms", "Computational Complexity, Graph Algorithms, Sorting, Dynamic Programming, ...", "A", 6, 3),
        new Course("Solving Problems and other Games", "Introduction to Python and AI", "A", 6, 1),
        new Course(
          "Pattern Recognition and Machine Learning",
          "Introduction to Pattern Recognition, Classifiers, Neural Nets, Regression, SVM, ...",
          "B",
          6,
          5
        ),
        new Course("Operating Systems", "Processes, Threads, Kernels, Memory Management, ...", "A", 4, 3),
        new Course("Parallel and Distributed Computing", "Parallelism in C/C++, OpenMP, Parallel Algorithms, Distributed Algorithms", "A", 6, 4),
        new Course("Introduction to Artificial Intelligence", "Search, CSP, Games, Logic, Planning, Monte Carlo Tree Search, ...", "A", 6, 4),
        new Course("Computer Networks", "Introduction to Networking, Protocols and Infrastructure, Error Correction", "A", 5, 2),
        new Course("Cryptography and Information Security", "Cyphers, Hashing, Authentication, Autorization, Safe Protocols", "A", 5, 5),
        new Course("Functional Programming", "Lips, Haskell, Lambda Calculus", "A", 6, 4),
        new Course("Final Exam", "Final Exam for the Bachelor's Degree - 2 Random Topics: Calculus 1 + Numerical Methdos", "A", 0, 6),
        new Course("Bachlor Thesis", "Presentation and Defense", "A", 0, 6),
      ],
      true
    ),
    new Thesis(
      "bachelor",
      "Comparing Exploration Methods in Partially Observable Stochastic Games",
      "A",
      ["Game Theory", "Reinforcement Learning", "Optimization", "Linear Programming"],
      "Stochastic Games or Markov Games is a class of Games in Competitive Game Theory which can model many real world situations. With Partial Observability, we prevent agents to see the whole state of the game thus making the reasoning more difficult. These games can be solved by by methods heavily relying on Linear Programming, most notably the Heuristic Search Value Iteration. These methods suffer poor scalability, mostly caused by the size of linear programs and by poor exploration. In my thesis, I tried using many Bandit algorithms to see if they can learn which actions are better than others and if they can help steer the exploration in more promising ways.",
      "https://dspace.cvut.cz/handle/10467/101325"
    )
  );
  const kaist = new Education(
    "Korean Advanced Insitute of Science and Technology",
    "KAIST",
    "Faculty of Electrical Engineering",
    "Exchange programme",
    Interval.build(2023, 2, 25, 2023, 6, 30),
    "Master",
    "logo_kaist.gif",
    "https://www.kaist.ac.kr/en/",
    "Exchange programme in South Korea's top research university during my first year of Master's studies",
    "Korean Advanced Institute of Science and Technology is a famous university in South Korea. It is regarded as the best technical university in the country and it is ranked among the best universities in the world. I attended the university during my first year of Master's studies as an exchange student. I studied four courses, which were all very interesting and challenging. I especially enjoyed Mathematical Foundations of Reinforcement Learning, where I learned a lot and would like to focus on this field more in the future. I would be able to pass the courses with better grades but I chose to travel a lot since it is a great opportunity to see the country and the culture and thus I did not have much time to study. What pleased me is that I was able to perform well even on a much higher-ranked university than my home one and that I could keep up with local full-time students.",
    new Grades(
      "A-F",
      true,
      [
        new Course("Mathematical Foundations of Reinforcement Learning", "From Dynamic Programming to Entropy RL and Soft Actor-Critic", "B0", 3, 0),
        new Course("Basics of Quantum Information and Quantum Computing", "Quantum Theory, Circuits and Algorithms", "A+", 3, 0),
        new Course("Graph Machine Learning and Mining", "Graph Theory, Graph Neural Networks, Knowledge Graphs", "B+", 3, 0),
        new Course("Compiler Design", "Semantic Analysis, Code Generation, Optimization", "B0", 3, 0),
      ],
      false
    )
  );
  const feeMaster = new Education(
    "Czech Technical University in Prague",
    "FEE CTU",
    "Faculty of Electrical Engineering",
    "Artificial Intelligence",
    Interval.build(2022, 9, 1, 2025, 6, 18),
    "Master",
    "logo_cvut.jpg",
    "https://oi.fel.cvut.cz/en/",
    "A follow-up Master's programme with focus on Artificial Intelligence and Machine Learning",
    "This programme directly follows the Bachelor programme and it deepens the knowledge in the field of Artificial Intelligence and Machine Learning, namely Optimization, Statistic and Symbolic Machine Learning, Game Theory, Logical Reasoning and Planning, Robotics and many more. My graduation was delayed by one year due to an exchange programme at KAIST and successfully graduated in June 2025. As a Master Thesis, I used probabilistic modelling to improve scoring functions for RANSAC and the following local refinement of Essential Matrix, where we model noise as more general anisotropic Gaussian noise in contrast to the standard methods. Since February 2024, I am also a member of Upsilon Pi Epsilon, an honour society in Computer Science.",
    new Grades(
      "1-4",
      true,
      [
        new Course("Computational Game Theory", "Algorithms to Solve Normal Form Games, Extensive Games and Cooperational Games", "A", 6, 1),
        new Course("Advanced Algorithms", "Graph Theory, Isomorphisms, Heaps and Data Structures, ...", "A", 6, 1),
        new Course("Digital Image Processing", "Image Filtering, Edge Detection, Image Segmentation, ...", "A", 6, 1),
        new Course(
          "Scientific Programming in Julia",
          "In-depth Analysis of Julia Language, its Compilation, Typesystem, Multiple Dispatch and Performance",
          "A",
          4,
          1
        ),
        new Course(
          "Statistical Machine Learning",
          "Error Bounds, VC Dimension, Structured Perceptron and SVM, Neural Networks, Bayesian Learning, EM Algorithm, ...",
          "A",
          6,
          1
        ),

        new Course(
          "Three Dimensionsal Computer Vision",
          "Projective geometry, Projective Camera, Epipolar Geometry, RANSAC, Camera Gluing, Bundle Adjustment, Stereovision, Point Clouds, ...",
          "A",
          6,
          3
        ),
        new Course("Logical Reasoning and Programming", "SAT Solving, Satisfiability Modulo Theories, First Order Logic, Resolution, Prolog, ...", "A", 6, 3),
        new Course(
          "Statistical Data Analysis",
          "Linear Regression, Non-linear regression, Discriminant Analysis, Clustering, Dimensionality reduction, Robust Statistics, ...",
          "A",
          6,
          3
        ),
        new Course(
          "Artificial Intelligence in Robotics",
          "TSP, TSPN, Dubins Vehicles, Navigation, Planning, Multi-Goal and Multi-Robot Planning, ...",
          "A",
          6,
          3
        ),

        new Course("Planning for Artificial Intelligence", "Simulations and Abstractions, LM-Cut, PDDL, STRIPS, ...", "A", 6, 4),
        new Course("Theory of Algorithms", "Complexity theory, Turing Machines, Complexity classes, Undecidability, Randomized algorithms", "A", 6, 4),
        new Course(
          "Deep Learning",
          "Deep Neural Networks, VAEs, Metric Learning, Initialization, Regularization, Adaptive Learning, Adversarial Learning, ...",
          "A",
          6,
          4
        ),
        new Course(
          "Combinatorial Optimization",
          "ILP, Shortest Paths, Network Flows and Cuts, Matching, TSP, Knapsack problem, Scheduling, CSP, ...",
          "B",
          6,
          4
        ),
        new Course(
          "Quantum Computing",
          "Quantum Computing, Deutsch-Josza, Grover, Quantum Fourier Transform, Adiabatic Quantum Computing, Quantum Random Walks, Quantum Error Correction",
          "A",
          5,
          4
        ),
        new Course("Computer Security", "Computer Security, Intrusion Detection, Attacks, Web Attacks, Malware, ...", "A", 6, 5),
        new Course("Programming in Python", "Python, OOP, Package management, ...", "A", 5, 5),
        new Course("Learning for Robotics", "Deep Learning, Convolutional Neural Networks, Segmentation, Reinforcement Learning, ...", "A", 6, 5),
        new Course("Individual Project", "Refining the statistical model for RANSAC based on the 3Dreconstruction data", "B", 6, 5),
        new Course("Diploma Thesis", "Probabilistic Modelling for Robust Scoring and Estimation of Geometric Relations", "Pass", 25, 6),
        new Course("Final Exam", "Final Exam for the Master's Degree - 2 Random Topics: Theory of Algorithms + Multi-armed bandit problem", "A", 0, 6),
      ],
      true
    ),
    new Thesis(
      "master",
      "Probabilistic Modelling for Robust Scoring and Estimation of Geometric Relations",
      "A",
      ["3D Computer Vision", "Probabilistic Modelling", "Maximum Likelihood Estimation", "EM algorithm", "Optimization"],
      "Relative camera pose estimation from noisy point correspondences is a fundamental problem in 3D computer vision. The widely used RANSAC algorithm and its variants rely heavily on the choice of a robust scoring function for inlier selection, hypothesis evaluation, and model refinement. While prior work has explored probabilistic scoring functions, these typically assume isotropic Gaussian inlier noise and uniformly distributed outlier noise. In this thesis, we revisit the connection between the Sampson error and the isotropic probabilistic noise model, and extend it to the more general case of anisotropic noise. We derive two novel log-likelihood-based scoring functions that more accurately model anisotropic noise, potentially leading to improved estimation accuracy. To address observed uncompensated radial distortion in the image data, we propose three statistical models designed to account for this effect. These models are trained for integration into our proposed scoring functions. Additionally, we introduce a local optimization method for refining the Essential matrix using the probabilistic scores, both in non-robust and robust settings. We evaluate various combinations of the proposed noise models and scoring functions, and compare them with the Sampson error on real-world datasets. Our experiments demonstrate that the proposed scoring functions can yield more accurate pose estimates, although further investigation is needed for certain cases.",
      "https://dspace.cvut.cz/handle/10467/123423"
    )
  );
  const essai2024 = new Education(
    "European Summer in Artificial Intelligence",
    "ESSAI & ACAI 2024",
    "",
    "Artificial Intelligence",
    Interval.build(2024, 7, 15, 2024, 7, 26),
    "Master / PhD",
    "logo_essai.png",
    "https://essai2024.di.uoa.gr/index.html",
    "2nd European Summer School on Artificial Intelligence and 21st Advanced Course on Artificial Intelligence",
    "Two week long summer school in Athens, Greece. Each of both weeks of the school the students could choose three courses from a wide range of topics in Artificial Intelligence and Machine Learning. The courses consisted of 5 standard lectures and were taught by professors and assistant professors from top European universities. After the three courses, each day there was a invited tutorial on some advanced topic.",
    new Grades(
      "",
      false,
      [
        new Course(
          "Integrated Konwledge-based and Data-driven Reasoning, Control, and Learning in Robotics",
          "Control, reasoning, robot planning based on logic",
          "Z",
          0.25,
          1
        ),
        new Course(
          "Logic-Based Explainable Artificial Intelligence",
          "Explainability in Decision trees and more complicated models, incorrectness of current SOTA tools",
          "Z",
          0.25,
          1
        ),
        new Course(
          "Game-Theoretic Approach to Temporal Synthesis",
          "Solving temporal synthesis as a Game on different types of automata (DFA, Buchi, coBuchi, ...)",
          "Z",
          0.25,
          1
        ),
        new Course("Deep Learning and Computer Vision for Surface Anomaly Detection", "", "Z", 0.05, 1),
        new Course("Equivariance in Learning for Perception", "", "Z", 0.05, 1),
        new Course("Diffusion Models in Medical Imaging and Analysis", "", "Z", 0.05, 1),
        new Course("Advancemenets in Self-Supervised Learning for Speech Technologies", "", "Z", 0.05, 1),
        new Course("Artificial Intelligence for Earth Observation - ESA theta lab", "", "Z", 0.05, 1),
        new Course("Multi-Agent Systems and Evolution", "Game Theory and Evolution in Complex Networks", "Z", 0.25, 2),
        new Course("Learning to Behave via Imitation", "Reinforcement Learning, Inverse Reinforcement Learning, Imitation Learning", "Z", 0.25, 2),
        new Course("Machines Learning Pearl's Ladder of Causation", "Causality, Bayesian Networks, ...", "Z", 0.25, 2),
        new Course("Generative Models for Robot Control", "", "Z", 0.05, 2),
        new Course("Exploring the Intersection of Voting Theory and AI", "", "Z", 0.05, 2),
        new Course("Can LLMs Reason and Plan?", "", "Z", 0.05, 2),
        new Course("The Power of Graph Learning", "", "Z", 0.05, 2),
        new Course("Self-designing AI Systems", "", "Z", 0.05, 2),
      ],
      true,
      "Week"
    )
  );

  const educations = [alej, feeBachelor, kaist, feeMaster, essai2024];

  const scalesoft = new Work(
    "Front End Web Developer",
    "Software Engineer",
    "Scalesoft",
    "logo_scalesoft.png",
    "http://in2.scalesoft.cz",
    "Part-time",
    [css, typescript, html, javascript, node],
    "A two-week internship before starting Bachelor studies which then translated into a part-time job during the first semester.",
    "", // Add long description
    Interval.build(2019, 8, 20, 2019, 12, 31)
  );

  const SWEHQ1 = new Work(
    "Web Software Development",
    "Software Engineer",
    "SWEHQ",
    "logo_swehq.png",
    "https://swehq.com/en/",
    "Part-time",
    [angular, typescript, html, css, javascript, node, docker],
    "Frontend developer for a complex web application for a major financial group in the Czech Republic. As a junior developer, I was responsible for the implementation of precise design, components for data visualisation and fixing bugs.",
    "", // Add long description
    Interval.build(2021, 6, 30, 2021, 11, 30)
  );

  const SWEHQ2 = new Work(
    "Web and Mobile Software Development",
    "Software Engineer",
    "SWEHQ",
    "logo_swehq.png",
    "https://swehq.com/en/",
    "Part-time",
    [flutter, dart, vue, python, javascript, typescript, django, docker, android, ios],
    "Development of multiple complex mobile and web applications in various languages. Specifically, a social mobile app for organizing events (Joinly), a web app for aggregating and selling holiday tours (Airstop), a web app for one of the Ministries of the Czech Republic and a monitoring system for analogue missions (CommonTongue). Currently, I am working on an AI-powered search engine for a local financial company to help them process internal methodologies.",
    "", // Add long description
    Interval.build(2022, 6, 30, 2025, 6, 30)
  );

  const ciirc = new Work(
    "ROADEF Challenge 2020",
    "Researcher and Developer",
    "CIIRC CTU",
    "logo_ciirc.jpg",
    "https://www.ciirc.cvut.cz",
    "Part-time",
    [cpp, c, python],
    "Research and development of an algorithm to solve an international competition in discrete optimisation ROADEF 2020. Due to the high complexity of the problem instances we had to develop a metaheuristic algorithm instead of an exact one.",
    "", // Add long description
    Interval.build(2020, 7, 1, 2021, 6, 29)
  );

  const works = [scalesoft, SWEHQ1, SWEHQ2, ciirc];

  const baltie = new Project(
    "Programming",
    "Graphical programming language Baltie 3 to learn C/C++",
    "Baltie 3 projects",
    "Extracurricular",
    "Small projects made in my free time during Primary School. Moreover, I attended competitions with some of these programs.",
    "", // Add long description
    "https://github.com/radajakub/baltie",
    [baltie3],
    Interval.build(2008, 9, 1, 2012, 9, 1)
  );

  const doubleOracle = new Project(
    "Game Theory",
    "Semestral project in Julia programming language University course",
    "Double Oracle Algorithm for solving zero-sum normal-form games",
    "FEE CTU",
    "Julia package created as a final project for a class at FEE CTU. It uses unique features of the Julia language to solve zero-sum normal-form games efficiently.",
    "", // Add long description
    "https://github.com/radajakub/DoubleOracle",
    [julia],
    Interval.build(2023, 1, 1, 2023, 2, 15)
  );

  const flashcards = new Project(
    "Software Engineering",
    "Graduation project at High School",
    "Flashcards web app in Electron",
    "GNA",
    "Final project for High School graduation. It is an Electron app for learning with flashcards. It features creation of custom flashcards, learning mode and multiple testing modes. In the test mode, errors are corrected using the Levenshtein distance.",
    "", // Add long description
    "https://github.com/radajakub/flashcards",
    [javascript, html, python, css, django],
    Interval.build(2019, 2, 1, 2019, 5, 15)
  );

  const resume = new Project(
    "Software Engineering",
    "Free-time personal project",
    "Resume / Personal portfolio webpage",
    "Personal",
    "This personal webpage which features automatic resume generation in LaTeX. It also features automatic deployment to GitHub Pages with custom domain.",
    "", // Add long description
    "https://github.com/radajakub/resume",
    [vue, typescript, html, css],
    Interval.build(2023, 9, 1, 2023, 10, 30)
  );

  const chess = new Project(
    "Software Engineering",
    "Semestral project in Java",
    "Chess Game with GUI and simple artificial player",
    "FEE CTU",
    "Chess desktop application with full rules (including Castling and En Passant), selection of timing options, arbitrary starting positions, artificial players and export/import in the PGN format. Also past games can be replayed leveraging the PGN format.",
    "", // Add long description
    "https://github.com/radajakub/chess-game",
    [java, javafx],
    Interval.build(2020, 2, 1, 2020, 5, 20)
  );

  const pong = new Project(
    "Low-level programming",
    "Semestral project in Computer Architectures",
    "Pong game for a micro-controller",
    "FEE CTU",
    "Single and multi-player Pong game for a micro-controller board. I learned very low-level programming in C, how to render fonts and graphical elements directly on a display and how to process inputs from sensors.",
    "", // Add long description
    "https://github.com/radajakub/apong",
    [c],
    Interval.build(2020, 6, 1, 2020, 6, 15)
  );

  const warehouseAllocation = new Project(
    "Optimization",
    "Semestral project from Evolutionary Algorithms",
    "Evolutionary and Memetic Algorithms",
    "FEE CTU",
    "Implementation and comparison of simple Local Search, an Evolutionary Algorithm and a Memetic Algorithm on the Warehouse Allocation Problem.",
    "", // Add long description
    "https://github.com/radajakub/warehouse-allocation",
    [cpp, python, latex],
    Interval.build(2021, 9, 25, 2022, 1, 15)
  );

  const bThesis = new Project(
    "Game Theory, Reinformcent Learning",
    "Bachelor Thesis combining Game Theory and Reinforcement Learning",
    "Comparing Exploration Methods in Partially Observable Stochastic Games",
    "FEE CTU",
    "There exists the Heuristic Search Value Iteration algorithm to solve Partially Observable Stochastic Games. It can have problems with exploration and poor scalability thus I tried using various Bandit algorithms and reinforcement learning techniques to mitigate these issues and see if bandits can perform well.",
    "", // Add long description
    "https://github.com/radajakub/bachelor-thesis",
    [julia, latex, python],
    Interval.build(2021, 9, 25, 2022, 5, 25)
  );

  const sac = new Project(
    "Reinforcement Learning",
    "Semestral project in Mathematical Foundations of Reinforcement Learning",
    "Soft Actor-Critic algorithm implementation",
    "KAIST",
    "Implementation of the Soft Actor-Critic algorithm from Deep Reinforcement Learning to teach a Walker to run in DeepMind Control Suite.",
    "", // Add long description
    "https://github.com/radajakub/soft-actor-critic",
    [python, pytorch],
    Interval.build(2023, 6, 5, 2023, 6, 15)
  );

  const kecc = new Project(
    "Compiler Design",
    "Semestral project in Compiler Design",
    "Implementation of KAIST Educational C Compiler in Rust",
    "KAIST",
    "During the semester we went through implementation of a complete C compiler in Rust programming language. The most important parts were the optimizations on intermediate representation.",
    "", // Add long description
    "https://github.com/kaist-cp/kecc-public",
    [rust],
    Interval.build(2023, 2, 25, 2023, 6, 10)
  );

  const gml = new Project(
    "Dimensionality Reduction",
    "Semestral project in Graph Machine Learnign and Mining",
    "Developing a novel approach to Dimensionality Reduction using Graphs",
    "KAIST",
    "With my group of friends we developed an algorithm to process and visualize high-dimensional data using graphs. Our algorithm could compete with state of the art in precision. It successfully unrolled the Swiss Roll dataset!",
    "", // Add long description
    "https://github.com/radajakub/GML-dim-reduction",
    [python, pytorch],
    Interval.build(2023, 5, 15, 2023, 6, 1)
  );

  const objectReconstruction = new Project(
    "Object Reconstruction",
    "Semestral project in 3D Computer Vision",
    "Reconstructing 3D objects from a set of 2D images",
    "FEE CTU",
    "Building a standard Computer Vision pipeline to estimate a dense 3D point cloud from a set of images from different angles. It included epipolar geometry, camera glueing and sparse 3D reconstruction, all of these using RANSAC and its variants.",
    "", // Add long description
    "https://github.com/radajakub/ObjectReconstruction",
    [python, matlab],
    Interval.build(2023, 9, 25, 2024, 1, 14)
  );

  const feedbackarcset = new Project(
    "Metaheuristic Algorithm",
    "Semestral project in Combinatorial Optimization",
    "Weighted Feedback Arc Set Problem",
    "FEE CTU",
    "Adaptive Large Neighborhood Search with Simulated Annealing to solve the Feedback Arc Set Problem with weighted edges. It uses automatic selection of custom operators over a permutation representation.",
    "", // Add long description
    "https://github.com/radajakub/FeedbackArcSetProblem",
    [cpp],
    Interval.build(2024, 5, 1, 2024, 5, 17)
  );

  const qsim = new Project(
    "qsim",
    "Project in Quantum Computing",
    "Quantum Simulator (Quantum Circuits)",
    "FEE CTU",
    "Implementation of a Quantum Circuits model of computation in C++. It is done in a modular way where the user composes a circuit from gates and then runs the simulation with optional measurements, similarly to qiskit. For reference the Deutsch-Josza algorithm and Simon's algorithm are prepared.",
    "", // Add long description
    "https://github.com/radajakub/qsim",
    [cpp],
    Interval.build(2024, 4, 20, 2024, 5, 11)
  );

  const gameOfLife = new Project(
    "Algorithms, Software Engineering",
    "Project in Programming in Python",
    "Multiplayer Game of Life",
    "FEE CTU",
    "My own extension of Conway's Game of Life which I tried to extend to arbitrary number of players. The goal is now not only to evolve and survive but also to win in the evolution over other players. The implementation includes the engine and a GUI application.",
    "", // Add long description
    "https://github.com/radajakub/game-of-life",
    [python],
    Interval.build(2024, 12, 29, 2025, 1, 12)
  );

  const shyguy = new Project(
    "AI Game",
    "Project for the Mistral AI Game Jam 2025",
    "Shyguy's Wingman",
    "Mistral AI Game Jam",
    "An AI game where the main character is a shy guy who wants to get a girlfriend. The player cannot control him directly but he can control his wingman and can try to persuade him or push him around. Shuyguy can also talk to other AI NPCs to get information or confidence.",
    "", // Add long description
    "https://github.com/radajakub/ShyguysWingmanJS",
    [javascript, python, mistral, elevenLabs, whisper],
    Interval.build(2025, 1, 24, 2025, 1, 26)
  );

  const onkoapp = new Project(
    "Software Engineering, RAG",
    "Project for Rakathon 2025",
    "OnkoApp",
    "Rakathon 2025",
    "An app that helps doctors plan treatments for cancer patients and for patients to see their progress and educational information about individual steps. App features RAG AI chatbot that answers questions regarding common questions and side effects of cancer treatments.",
    "",
    "",
    [typescript, vue, python, huggingFace],
    Interval.build(2025, 4, 11, 2025, 4, 13)
  );

  const mThesis = new Project(
    "Probabilistic Modelling",
    "Master Thesis in Computer Vision",
    "Probabilistic Modelling for Robust Scoring and Estimation of Geometric Relations",
    "FEE CTU",
    "Scoring functions for robust estimation of geometric relations often assume isotropic Gaussian noise. Using anisotropic distributions led to better precision in locally optimizing the Essential matrix under learned covariance matrices.",
    "", // Add long description
    "https://github.com/radajakub/bachelor-thesis",
    [python, pytorch],
    Interval.build(2024, 9, 1, 2025, 5, 23)
  );

  const projects = [
    baltie,
    doubleOracle,
    flashcards,
    resume,
    chess,
    pong,
    warehouseAllocation,
    bThesis,
    sac,
    kecc,
    gml,
    objectReconstruction,
    qsim,
    feedbackarcset,
    gameOfLife,
    shyguy,
    onkoapp,
    mThesis,
  ];

  const baltieNational = new Achievement(
    "Baltie 2011 National Round",
    "Participation and second place in the national round of Baltie 3 competition at 11 years old. Judges evaluated the algorithmic and code quality of solutions for given tasks.",
    "", // Add long description
    "SGP Systems",
    "logo_baltie.gif",
    "https://soutez.tib.cz/souteze/baltie/baltie-2011/narodni",
    "2nd place",
    "Programming",
    new Interval(new TimePoint(2011, 5, 13), TimePoint.zero()),
    baltie3,
    true
  );

  const baltieInternational = new Achievement(
    "Baltie 2011 International Round",
    "Participation and third place in the international round of Baltie 3 competition at 11 years old. Judges evaluated the algorithmic and code quality of solutions for given tasks.",
    "", // Add long description
    "SGP Systems",
    "logo_baltie.gif",
    "https://soutez.tib.cz/souteze/baltie/baltie-2011/mezinarodni",
    "3rd place",
    "Programming",
    new Interval(new TimePoint(2011, 6, 12), TimePoint.zero()),
    baltie3,
    true
  );

  const bachelorThesisDeansAward = new Achievement(
    "Comparing Exploration Methods in Partially Observable Stochastic Games",
    "Applying Reinforcement Learning and Bandit algorithms to Heuristic Search Value Iteration for Partially Observable Stochastic Games",
    "", // Add long description
    "FEE CTU",
    "logo_cvut.jpg",
    "https://dspace.cvut.cz/handle/10467/101325",
    "Dean's award for exceptional Bachelor Thesis",
    "Reasearch Thesis",
    new Interval(new TimePoint(2022, 11, 5), TimePoint.zero()),
    julia,
    true
  );

  const seoulMarathon = new Achievement(
    "Soul Marathon 2023 Relay",
    "Together with my running duo from Japan, we won the two-person relay at Seoul. I ran the second part which was 22.2 kilometers long in 1:24:44.",
    "", // Add long description
    "Seoul Marathon",
    "logo_seoul.png",
    "https://en.seoul-marathon.com",
    "1st place",
    "Running",
    new Interval(new TimePoint(2023, 3, 19), TimePoint.zero()),
    undefined,
    false
  );

  const daeguHalfmarathon = new Achievement(
    "Daegu International Half Marathon 2023",
    "At my first solo half-marathon I placed 10th overall in a new personal best of 1:18:54.",
    "", // Add long description
    "Daegu International Marathon",
    "logo_daegu.jpg",
    "https://daegurace.com",
    "10th place",
    "Running",
    new Interval(new TimePoint(2023, 4, 2), TimePoint.zero()),
    undefined,
    false
  );

  const roadef = new Achievement(
    "ROADEF Challenge 2020",
    "Together with my friend we placed second at a discrete optimization competition in the junior category. Moreover, our paper was published in the Journal of Heuristics.",
    "", // Add long description
    "EURO",
    "logo_roadef.png",
    "https://www.roadef.org/challenge/2020/en/",
    "2nd place in the junior category",
    "Research / Project",
    new Interval(new TimePoint(2021, 6, 14), TimePoint.zero()),
    cpp,
    true
  );

  const achievements = [baltieNational, baltieInternational, bachelorThesisDeansAward, seoulMarathon, daeguHalfmarathon, roadef];

  const roadefPaper = new Publication(
    "The ALNS metaheuristic for the transmission maintenance scheduling",
    "Paper describing our metaheuristic algorithm solving the ROADEF 2020 Challenge.",
    "Journal of Heuristics / Springer Nature",
    "logo_springer.svg",
    "https://link.springer.com/article/10.1007/s10732-023-09514-x",
    PublicationCategories.paper,
    new TimePoint(2023, 5, 27)
  );
  const publications = [roadefPaper];

  const upe = new Membership(
    "Upsilon Pi Epsilon",
    "Honor Society",
    "International Honor Society for the Computing and Information Disciplines",
    "logo_upe.png",
    "https://upe.acm.org",
    new Interval(new TimePoint(2024, 2, 13), TimePoint.infinity())
  );

  const fce = new Certificate(
    "Cambridge First Certificate in English",
    "B2 certificate in English",
    "Passed during second year of High School as an alternative to the English exam for graduation.",
    [
      new TestSection("Reading", 179, 190),
      new TestSection("Writing", 160, 190),
      new TestSection("Listening", 190, 190),
      new TestSection("Speaking", 165, 190),
      new TestSection("Use of English", 190, 190),
    ],
    "mean",
    "logo_fce.png",
    "https://www.cambridgeenglish.org/exams-and-tests/first/",
    new Interval(new TimePoint(2017, 6, 17), TimePoint.infinity())
  );

  const toefl = new Certificate(
    "TOEFL iBT",
    "English proficiency test",
    "",
    [new TestSection("Reading", 29, 30), new TestSection("Listening", 29, 30), new TestSection("Speaking", 28, 30), new TestSection("Writing", 30, 30)],
    "sum",
    "logo_toefl.svg",
    "https://www.ets.org/toefl/test-takers/ibt/about.html",
    new Interval(new TimePoint(2024, 9, 21), new TimePoint(2026, 9, 21))
  );

  const memberships = [upe];

  const certificates = [fce, toefl];

  const mistralGameJam2025 = new Hackathon(
    "Shyguy's Wingman",
    "Mistral AI Game Jam 2025",
    "Paris, France",
    ["Mistral AI", "Hugging Face", "Eleven Labs", "Scaleway", "Nebius"],
    "A three-day hackathon in Paris where we had to develop a game in a team of six. The theme of the hackathon was 'You don’t control the character'. As none of us was a game developer, we developed a game in javascript where the user can influence player's actions by interacting with his LLM by text or voice and by pushing him to interact with NPCs. The judges loved our game and we got into the final round of pitches.",
    "", // Add long description
    "https://huggingface.co/spaces/Mistral-AI-Game-Jam/shyguys_2",
    "logo_mistral.png",
    [javascript, python, mistral, elevenLabs, whisper],
    new Interval(new TimePoint(2025, 1, 24), new TimePoint(2025, 1, 26))
  );

  const rakathon2025 = new Hackathon(
    "OnkoApp",
    "Rakathon 2025",
    "Prague, Czech Republic",
    ["RAG Agent", "Vue.js", "Hugging Face"],
    "A two-day hackathon where we were supposed to develop a solution for one of 8 challenges regarding doctors and treatment of cancer patients. We build a platform for efficient planning of treatments, sharing of information and results between doctors and patients and providing educational information for patients. Our solution placed 2nd overall and awaits deployment into real hospitals!",
    "", // Add long description
    "https://www.rakathon.cz",
    "logo_rakathon.png",
    [vue, python, huggingFace],
    new Interval(new TimePoint(2025, 4, 11), new TimePoint(2025, 4, 13))
  );

  const hackathons = [mistralGameJam2025, rakathon2025];

  return new Data(
    firstName,
    lastName,
    degreesBeforeName,
    titles,
    aboutMe,
    goals,
    dateOfBirth,
    age,
    location,
    web,
    contacts,
    skills,
    educations,
    works,
    projects,
    achievements,
    publications,
    memberships,
    certificates,
    hackathons
  );
}
