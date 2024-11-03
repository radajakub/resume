export class TimePoint {
  static infinity(): TimePoint {
    return new TimePoint(-1, -1, -1);
  }

  static zero(): TimePoint {
    return new TimePoint(0, 0, 0);
  }

  readonly year: number;
  readonly month: number;
  readonly day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  get isInfinity(): boolean {
    return this.year == -1 && this.month == -1 && this.day == -1;
  }

  get isZero(): boolean {
    return this.year == 0 && this.month == 0 && this.day == 0;
  }

  toTime(): number {
    return new Date(this.year, this.month - 1, this.day).getTime();
  }

  isFuture(): boolean {
    return this.toTime() > Date.now();
  }

  format(showDay = true, hideFuture = false): string {
    if (hideFuture && this.isFuture()) {
      return "present";
    }
    const day = showDay ? `${(this.day < 10 ? "0" : "") + this.day}/` : "";
    return `${day}${(this.month < 10 ? "0" : "") + this.month}/${this.year}`;
  }

  computeAge(): number {
    const dateOfBirth = new Date(this.year, this.month, this.day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  static descending(a: TimePoint, b: TimePoint) {
    if (a.isInfinity && b.isInfinity) return 0;
    if (a.isInfinity) return -1;
    if (b.isInfinity) return 1;
    return b.toTime() - a.toTime();
  }
}

export class Interval {
  static build(syear: number, smonth: number, sday: number, eyear: number, emonth: number, eday: number) {
    return new Interval(new TimePoint(syear, smonth, sday), new TimePoint(eyear, emonth, eday));
  }

  readonly start: TimePoint;
  readonly end: TimePoint;

  constructor(start: TimePoint, end: TimePoint) {
    this.start = start;
    this.end = end;
  }

  computePercentage(): number {
    const wholeInterval = this.end.toTime() - this.start.toTime();
    const currInterval = Date.now() - this.start.toTime();
    return Math.min(Math.round((currInterval * 100) / wholeInterval), 100);
  }

  yearRange(hideFuture = false): string {
    if (this.start.year == this.end.year) {
      return `${this.start.year}`;
    }
    if (hideFuture && this.end.isFuture()) {
      return `${this.start.year} - present`;
    }
    return `${this.start.year} - ${this.end.year}`;
  }

  format(showDay = true, hideFuture = false): string {
    if (this.end.isInfinity || this.end.isZero) {
      return this.start.format(showDay, hideFuture);
    }
    return `${this.start.format(showDay, hideFuture)} - ${this.end.format(showDay, hideFuture)}`;
  }

  length(): string {
    if (this.end.isInfinity) {
      return "Lifetime";
    }
    if (this.start.isZero) {
      return "";
    }
    const diff = this.end.toTime() - this.start.toTime();
    return new Date(diff).getFullYear() - new Date(0).getFullYear() + " years";
  }

  static descending(a: Interval, b: Interval) {
    const sortEnd = TimePoint.descending(a.end, b.end);
    if (sortEnd) return sortEnd;
    return TimePoint.descending(a.start, b.start);
  }
}

export class Info {
  readonly name: string;
  readonly icon: string;

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }
}

export class DateOfBirth extends Info {
  readonly date: TimePoint;

  constructor(name: string, icon: string, date: TimePoint) {
    super(name, icon);
    this.date = date;
  }
}

export class Age extends Info {
  constructor(name: string, icon: string) {
    super(name, icon);
  }
}

export class Skill extends Info {
  readonly skills: string[];

  constructor(name: string, icon: string, skills: string[]) {
    super(name, icon);
    this.skills = skills;
  }
}

export class Location extends Info {
  readonly city: string;
  readonly country: string;
  readonly flexible: boolean;

  constructor(name: string, icon: string, city: string, country: string, flexible = false) {
    super(name, icon);
    this.city = city;
    this.country = country;
    this.flexible = flexible;
  }

  format(): string {
    return `${this.city}, ${this.country}`;
  }
}

export enum ContactType {
  web,
  phone,
  email,
  github,
  linkedin,
  discord,
  leetcode,
  hackerrank,
  kaggle,
}

export class Contact extends Info {
  readonly type: ContactType;
  readonly username: string;
  readonly link: string;
  readonly use: boolean;

  constructor(name: string, icon: string, type: ContactType, username: string, link: string, use = true) {
    super(name, icon);
    this.type = type;
    this.username = username;
    this.link = link;
    this.use = use;
  }
}

export class Course {
  readonly name: string;
  readonly description: string;
  readonly grade: string;
  readonly credits: number;
  readonly group: number;

  constructor(name: string, description: string, grade: string, credits: number, semester = 0) {
    this.name = name;
    this.description = description;
    this.grade = grade;
    this.credits = credits;
    this.group = semester;
  }
}

export class Thesis {
  readonly level: string;
  readonly title: string;
  readonly grade: string;
  readonly badges: string[];
  readonly description: string;
  readonly link?: string;

  constructor(level: string, title: string, grade: string, badges: string[], description: string, link: string) {
    this.level = level;
    this.title = title;
    this.grade = grade;
    this.badges = badges;
    this.description = description;
    this.link = link;
  }
}

export class Grades {
  static noGrade = "Passed";
  static defaultGroupLabel = "Semester";

  static gradeLookup = new Map<string, number>([
    ["A", 1],
    ["B", 1.5],
    ["C", 2],
    ["D", 2.5],
    ["E", 3],
    ["F", 4],
    ["Pass", 0],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["0", 0],
  ]);

  readonly groupLabel: string;
  readonly courses: Course[];
  readonly result: string;
  readonly showGPA: boolean;
  readonly scale: string;
  readonly graduatedWithHonors: boolean;

  constructor(scale: string, graduatedWithHonors: boolean, courses: Course[], showGPA = false, groupLabel = Grades.defaultGroupLabel) {
    this.courses = courses;
    this.showGPA = showGPA;
    this.scale = scale;
    this.graduatedWithHonors = graduatedWithHonors;
    this.result = this.averageGrade();
    this.groupLabel = groupLabel;
  }

  averageGrade(): string {
    if (this.courses.length == 0) {
      return "";
    }

    const sumOfCredits = this.courses.map((c) => c.credits).reduce((a, b) => a + b);
    const sumOfGrades = this.courses.map((c) => (Grades.gradeLookup.get(c.grade) ?? 0) * c.credits).reduce((a, b) => a + b);

    if (sumOfGrades == 0) {
      return Grades.noGrade;
    }

    const average = Math.round((sumOfGrades / sumOfCredits + Number.EPSILON) * 100) / 100;
    return average.toString();
  }
}

export class Education {
  readonly school: string;
  readonly shortcut?: string;
  readonly faculty?: string;
  readonly specialization: string;
  readonly interval: Interval;
  readonly level: string;
  readonly logoPath: string;
  readonly link: string;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly grades: Grades;
  readonly thesis?: Thesis;

  constructor(
    school: string,
    shortcut: string,
    faculty: string,
    specialization: string,
    timeFrame: Interval,
    level: string,
    logoPath: string,
    link: string,
    shortDescription: string,
    longDescription: string,
    grades: Grades,
    thesis?: Thesis
  ) {
    this.school = school;
    this.shortcut = shortcut == "" ? undefined : shortcut;
    this.faculty = faculty == "" ? undefined : faculty;
    this.specialization = specialization;
    this.interval = timeFrame;
    this.level = level;
    this.logoPath = logoPath;
    this.link = link;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.grades = grades;
    this.thesis = thesis;
  }
}

export class ProgrammingLanguage {
  readonly name: string;
  readonly icon?: string;

  constructor(name: string, icon?: string) {
    this.name = name;
    this.icon = icon;
  }
}

export class Work {
  readonly title: string;
  readonly field: string;
  readonly companyName: string;
  readonly logoPath: string;
  readonly logoLink: string;
  readonly mode: string;
  readonly programmingLanguages: ProgrammingLanguage[];
  readonly shortDescription: string;
  readonly description: string;
  readonly interval: Interval;

  constructor(
    title: string,
    field: string,
    companyName: string,
    logoPath: string,
    logoLink: string,
    mode: string,
    programmingLanguages: ProgrammingLanguage[],
    shortDescription: string,
    description: string,
    interval: Interval
  ) {
    this.title = title;
    this.field = field;
    this.companyName = companyName;
    this.logoPath = logoPath;
    this.logoLink = logoLink;
    this.mode = mode;
    this.programmingLanguages = programmingLanguages;
    this.shortDescription = shortDescription;
    this.description = description;
    this.interval = interval;
  }
}

export class Project {
  readonly topic: string;
  readonly subtitle: string;
  readonly name: string;
  readonly relatedInstitution: string;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly githubLink: string;
  readonly programmingLanguages: ProgrammingLanguage[];
  readonly interval: Interval;

  constructor(
    topic: string,
    subtitle: string,
    name: string,
    relatedInstitution: string,
    shortDescription: string,
    longDescription: string,
    githubLink: string,
    programmingLanguages: ProgrammingLanguage[],
    interval: Interval
  ) {
    this.topic = topic;
    this.subtitle = subtitle;
    this.name = name;
    this.relatedInstitution = relatedInstitution;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.githubLink = githubLink;
    this.programmingLanguages = programmingLanguages;
    this.interval = interval;
  }
}

export class Achievement {
  readonly name: string;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly awardingInstitution: string;
  readonly logoPath: string;
  readonly link: string;
  readonly achievement: string;
  readonly category: string;
  readonly interval: Interval;
  readonly programmingLanguage?: ProgrammingLanguage;

  constructor(
    name: string,
    shortDescription: string,
    longDescription: string,
    awardingInstitution: string,
    logoPath: string,
    link: string,
    achievement: string,
    category: string,
    interval: Interval,
    programmingLanguage?: ProgrammingLanguage
  ) {
    this.name = name;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.awardingInstitution = awardingInstitution;
    this.logoPath = logoPath;
    this.link = link;
    this.achievement = achievement;
    this.category = category;
    this.interval = interval;
    this.programmingLanguage = programmingLanguage;
  }
}

export enum PublicationCategories {
  paper,
  package,
}

export class Publication {
  readonly title: string;
  readonly shortDescription: string;
  readonly publisher: string;
  readonly logoPath: string;
  readonly link: string;
  readonly category: PublicationCategories;
  readonly date: TimePoint;

  constructor(title: string, shortDescription: string, publisher: string, logoPath: string, link: string, category: PublicationCategories, date: TimePoint) {
    this.title = title;
    this.shortDescription = shortDescription;
    this.publisher = publisher;
    this.logoPath = logoPath;
    this.link = link;
    this.category = category;
    this.date = date;
  }

  getCategoryString(): string {
    switch (this.category) {
      case PublicationCategories.paper:
        return "Paper";
      case PublicationCategories.package:
        return "Package";
      default:
        return "";
    }
  }
}

export class TestSection {
  readonly name: string;
  readonly points: number;
  readonly maxPoints: number;

  constructor(name: string, points: number, maxPoints: number) {
    this.name = name;
    this.points = points;
    this.maxPoints = maxPoints;
  }
}

export class Membership {
  readonly name: string;
  readonly category: string;
  readonly shortDescription: string;
  readonly logoPath: string;
  readonly link: string;
  readonly interval: Interval;

  constructor(name: string, category: string, shortDescription: string, logoPath: string, link: string, interval: Interval) {
    this.name = name;
    this.category = category;
    this.shortDescription = shortDescription;
    this.logoPath = logoPath;
    this.link = link;
    this.interval = interval;
  }
}

export class Certificate {
  readonly name: string;
  readonly category: string;
  readonly shortDescription: string;
  readonly testSections: TestSection[];
  readonly aggregation: "sum" | "mean";
  readonly logoPath: string;
  readonly link: string;
  readonly interval: Interval;

  constructor(
    name: string,
    category: string,
    shortDescription: string,
    testSections: TestSection[],
    aggregation: "sum" | "mean",
    logoPath: string,
    link: string,
    interval: Interval
  ) {
    this.name = name;
    this.category = category;
    this.shortDescription = shortDescription;
    this.testSections = testSections;
    this.aggregation = aggregation;
    this.logoPath = logoPath;
    this.link = link;
    this.interval = interval;
  }

  getTotalSection(): TestSection {
    if (this.aggregation === "mean") {
      return new TestSection(
        "Overall",
        Math.ceil(this.testSections.map((section) => section.points).reduce((a, b) => a + b, 0) / this.testSections.length),
        Math.ceil(this.testSections.map((section) => section.maxPoints).reduce((a, b) => a + b, 0) / this.testSections.length)
      );
    }
    return new TestSection(
      "Total",
      this.testSections.map((section) => section.points).reduce((a, b) => a + b, 0),
      this.testSections.map((section) => section.maxPoints).reduce((a, b) => a + b, 0)
    );
  }
}

export enum Sections {
  introduction,
  aboutme,
  skills,
  education,
  work,
  projects,
  achievements,
  publications,
  memberships,
  certificates,
}

export class Section {
  readonly name: string;
  readonly icon: string;

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }

  linkify(): string {
    return this.name.toLowerCase().split(" ").join("-");
  }
}

export class Data {
  readonly firstName: string;
  readonly lastName: string;
  readonly degreesBeforeName: string[];
  readonly titles: string[];
  readonly aboutMe: string[];
  readonly goals: string;
  readonly dateOfBirth: DateOfBirth;
  readonly age: Age;
  readonly location: Location;
  readonly web: Contact;
  readonly contacts: Map<ContactType, Contact>;
  readonly skills: Skill[];
  readonly educations: Education[];
  readonly works: Work[];
  readonly projects: Project[];
  readonly achievements: Achievement[];
  readonly publications: Publication[];
  readonly memberships: Membership[];
  readonly certificates: Certificate[];

  constructor(
    firstName: string,
    lastName: string,
    degreesBeforeName: string[],
    titles: string[],
    aboutMe: string[],
    goals: string,
    dateOfBirth: DateOfBirth,
    age: Age,
    location: Location,
    web: Contact,
    contacts: Map<ContactType, Contact>,
    skills: Skill[],
    educations: Education[],
    works: Work[],
    projects: Project[],
    achievements: Achievement[],
    publications: Publication[],
    memberships: Membership[],
    certificates: Certificate[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.degreesBeforeName = degreesBeforeName;
    this.titles = titles;
    this.aboutMe = aboutMe;
    this.goals = goals;
    this.dateOfBirth = dateOfBirth;
    this.age = age;
    this.location = location;
    this.web = web;
    this.contacts = contacts;
    this.skills = skills;
    this.educations = educations;
    this.works = works;
    this.projects = projects;
    this.achievements = achievements;
    this.publications = publications;
    this.memberships = memberships;
    this.certificates = certificates;
  }

  fullName(): string {
    const parts = [];
    if (this.degreesBeforeName.length != 0) {
      parts.push(this.degreesBeforeName.join(", "));
    }
    parts.push(this.firstName);
    parts.push(this.lastName);
    return parts.join(" ");
  }

  sections(): Map<Sections, Section> {
    const present: Map<Sections, Section> = new Map();
    present.set(Sections.introduction, new Section("Introduction", "fa-solid fa-info"));
    if (this.aboutMe.length != 0) {
      present.set(Sections.aboutme, new Section("About Me", "fa-solid fa-user"));
    }
    if (this.skills.length != 0) {
      present.set(Sections.skills, new Section("Skills", "fa-solid fa-lightbulb"));
    }
    if (this.educations.length != 0) {
      present.set(Sections.education, new Section("Education", "fa-solid fa-graduation-cap"));
    }
    if (this.certificates.length != 0) {
      present.set(Sections.certificates, new Section("Certificates", "fa-solid fa-certificate"));
    }
    if (this.memberships.length != 0) {
      present.set(Sections.memberships, new Section("Memberships", "fa-solid fa-building-columns"));
    }
    if (this.publications.length != 0) {
      present.set(Sections.publications, new Section("Publications", "fa-solid fa-paperclip"));
    }
    if (this.works.length != 0) {
      present.set(Sections.work, new Section("Work", "fa-solid fa-computer"));
    }
    if (this.projects.length != 0) {
      present.set(Sections.projects, new Section("Projects", "fa-code-branch"));
    }
    if (this.achievements.length != 0) {
      present.set(Sections.achievements, new Section("Achievements", "fa-solid fa-award"));
    }
    return present;
  }

  educationsSorted(): Education[] {
    return this.educations.sort((a, b) => Interval.descending(a.interval, b.interval));
  }

  worksSorted(): Work[] {
    return this.works.sort((a, b) => Interval.descending(a.interval, b.interval));
  }

  projectsSorted(): Project[] {
    return this.projects.sort((a, b) => Interval.descending(a.interval, b.interval));
  }

  achievementsSorted(): Achievement[] {
    return this.achievements.sort((a, b) => Interval.descending(a.interval, b.interval));
  }

  publicationsSorted(): Publication[] {
    return this.publications.sort((a, b) => TimePoint.descending(a.date, b.date));
  }

  membershipsSorted(): Membership[] {
    return this.memberships.sort((a, b) => Interval.descending(a.interval, b.interval));
  }

  certificatessSorted(): Certificate[] {
    return this.certificates.sort((a, b) => Interval.descending(a.interval, b.interval));
  }
}
