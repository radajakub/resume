import { ContactType, Data, Interval, TestSection } from "../data/types";
import { writeFileSync } from "fs";
import { initData } from "../data/data";

function define(name: string, args?: string, params?: string[]): string {
  const paramstring = params !== undefined && params.length > 0 ? `[${params.join(",")}]` : "";
  const argstring = args !== undefined ? `{${args}}` : "";
  return `\\${name}${paramstring}${argstring}`;
}

function command(name: string, args?: string, params?: string[], kwargs?: string): string {
  const paramstring = params !== undefined && params.length > 0 ? `[${params.join(",")}]` : "";
  const argstring = args !== undefined ? `{${args}}` : "";
  const kwargstring = kwargs !== undefined ? `{${kwargs}}` : "";
  return `\\${name}${argstring}${paramstring}${kwargstring}`;
}

function textbf(content?: string): string {
  return command("textbf", content);
}

function href(content?: string, url?: string): string {
  return command("href", url ?? "", undefined, content ?? "");
}

function block(name: string, content: string): string {
  return `\\begin{${name}}\n${content}\n\\end{${name}}`;
}

function math(content: string): string {
  return `$${content}$`;
}

function mathcommand(command: string): string {
  return math(`\\${command}`);
}

class LaTeX {
  readonly data: Data;
  output: string[];

  constructor(data: Data) {
    this.data = data;
    this.output = [];
  }

  clear(): void {
    this.output = [];
  }

  add(item: string): void {
    this.output.push(item);
  }

  header(height = 27, width = 18.5): void {
    this.add(define("documentclass", "article", ["a4paper", "11pt"]));
    this.add(define("usepackage", "geometry", ["a4paper", `total={${width}cm, ${height}cm}`]));
    this.add(define("usepackage", "parskip", ["parfill"]));
    this.add(define("usepackage", "inputenc", ["utf8"]));
    this.add(define("usepackage", "fontenc", ["T1"]));
    this.add(define("usepackage", "hyperref"));
  }

  fancyHeader(title: string): void {
    this.add(define("usepackage", "fancyhdr"));
    this.add(define("usepackage", "datetime", ["ddmmyyyy"]));
    this.add(command("pagestyle", "fancy"));
    this.add(command("fancyhf", ""));
    this.add(command("lhead", command("today")));
    this.add(command("chead", title));
    this.add(command("rhead", this.data.fullName()));
  }

  title(): void {
    this.add(block("center", block("Huge", textbf(command("textsc", this.data.fullName())))));
  }

  info(): void {
    const contactTypes = [ContactType.email, ContactType.web, ContactType.github, ContactType.linkedin];
    const contacts = contactTypes
      .map((ct) => this.data.contacts.get(ct))
      .map((c) => {
        if (c !== undefined && [ContactType.github, ContactType.linkedin].includes(c.type)) {
          return textbf(`${c.name}: ${href(c.username, c.link)}`);
        }
        return textbf(href(c?.username, c?.link));
      });
    this.add(block("center", contacts.join(" " + mathcommand("cdot") + " ")));
  }

  newLine(): void {
    this.add("");
  }

  newPage(): void {
    this.add(command("pagebreak"));
  }

  section(title: string): void {
    this.add(command("section*", command("textsc", title)));
    this.add(command("hrule"));
  }

  splitText(left: string[], right: string[], firstwidth = 0.5): void {
    this.add(command("begin", "minipage", ["t"], `${firstwidth}\\textwidth`));
    this.add(command("begin", "flushleft"));
    left.forEach((line) => {
      this.add(line);
      this.add("");
    });
    this.add(command("end", "flushleft"));
    this.add(command("end", "minipage"));
    this.add(command("begin", "minipage", ["t"], `${Math.round((1 - firstwidth) * 100) / 100}\\textwidth`));
    this.add(command("begin", "flushright"));
    right.forEach((line) => {
      this.add(line);
      this.add("");
    });
    this.add(command("end", "flushright"));
    this.add(command("end", "minipage"));
  }

  duration(interval: Interval, bold: boolean): string {
    const s = interval.format(false, true);
    return bold ? textbf(s) : s;
  }

  itemize(items: string[]): void {
    this.add(command("begin", "itemize"));
    items.forEach((item) => this.add(command("item", item)));
    this.add(command("end", "itemize"));
  }

  skills(): void {
    this.section("Skills");
    for (const skill of this.data.skills) {
      this.add(textbf(skill.name + ":"));
      this.add(skill.skills.join(", "));
      this.add("");
    }
  }

  education(): void {
    this.section("Education");
    this.newLine();
    for (const education of this.data.educationsSorted()) {
      const left = [textbf(education.school), education.specialization];
      const right = [this.duration(education.interval, true), education.level];
      this.splitText(left, right, 0.7);
      this.itemize([education.shortDescription]);
      this.newLine();
    }
  }

  certificates(): void {
    this.section("Certificates");
    for (const certificate of this.data.certificatesSorted(true)) {
      const left = [];
      if (certificate.testSections.length) {
        const totalSection: TestSection = certificate.getTotalSection();
        left.push(textbf(`${certificate.name} (${math(`${totalSection.points}/${totalSection.maxPoints}`)})`));
        const scores = certificate.testSections.map((section) => section.name + " " + math(section.points.toString())).reduce((a, b) => a + ", " + b);
        left.push(scores);
      } else {
        left.push(textbf(certificate.name));
        left.push(certificate.category);
      }
      const right = [textbf(certificate.interval.format(false)), certificate.interval.length()];
      this.splitText(left, right, 0.7);
      this.newLine();
    }
  }

  memberships(): void {
    this.section("Fellowships and Societies");
    for (const membership of this.data.membershipsSorted(true)) {
      const left = [textbf(membership.name), membership.category];
      const right = [textbf(membership.interval.format(false)), membership.interval.length()];
      this.splitText(left, right, 0.7);
      this.newLine();
    }
  }

  publications(): void {
    this.section("Publications");
    this.newLine();
    for (const publication of this.data.publicationsSorted(true)) {
      const left = [textbf(publication.title), publication.publisher];
      const right = [textbf(publication.date.format(false)), publication.getCategoryString()];
      this.splitText(left, right, 0.8);
      this.newLine();
    }
  }

  experience(): void {
    this.section("Experience");
    this.newLine();
    for (const work of this.data.worksSorted(true)) {
      const left = [textbf(work.title), work.companyName + " | " + work.mode];
      const right = [this.duration(work.interval, true), work.field];
      this.splitText(left, right, 0.7);
      this.itemize([work.programmingLanguages.map((lang) => lang.name).join(", "), work.shortDescription]);
      this.newLine();
    }
  }

  projects(): void {
    this.section("Projects");
    this.newLine();
    for (const project of this.data.projectsSorted(true)) {
      const left = [textbf(project.name), project.subtitle];
      const right = [this.duration(project.interval, true), project.relatedInstitution];
      this.splitText(left, right, 0.7);
      this.itemize([project.programmingLanguages.map((lang) => lang.name).join(", ")]);
      this.newLine();
    }
  }

  achievements(): void {
    this.section("Achievements");
    this.newLine();
    for (const achievement of this.data.achievementsSorted(true)) {
      const left = [textbf(achievement.name), achievement.achievement];
      const right = [this.duration(achievement.interval, true), achievement.awardingInstitution];
      this.splitText(left, right, 0.7);
      this.newLine();
    }
  }

  texifyResume(): void {
    this.output = [];

    this.header();
    this.newLine();
    this.add(command("begin", "document"));

    this.title();
    this.info();
    this.newLine();

    this.education();
    this.newLine();

    this.memberships();
    this.newLine();

    this.publications();
    this.newLine();

    this.experience();
    this.newLine();

    // this.projects();
    // this.newLine();

    this.achievements();
    this.newLine();

    this.certificates();
    this.newLine();

    this.skills();

    this.add(command("end", "document"));

    this.writeToFile("resume.tex");
  }

  writeToFile(filename: string): void {
    writeFileSync(filename, this.output.join("\n"), { flag: "w" });
  }
}

const data = initData();
const latex = new LaTeX(data);
latex.texifyResume();
