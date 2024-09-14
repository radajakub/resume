import { CoverLetter, Data, TimePoint } from "../data/types";
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
    this.add(block("center", block("Huge", command("textbf", command("textsc", this.data.fullName())))));
  }

  info(): void {
    const contacts: string[] = ["", "", "", "", ""];
    contacts[0] = command("textbf", this.data.location.format());
    contacts[1] = command("textbf", this.data.dateOfBirth.date.format());
    for (const contact of this.data.contacts) {
      if (contact.name === "Email address") {
        contacts[2] = command("textbf", contact.username);
      }
      if (contact.name === "Phone number") {
        contacts[3] = command("textbf", contact.username);
      }
    }
    contacts[4] = command("textbf", this.data.web.username);
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

  duration(start: TimePoint, end: TimePoint, bold: boolean): string {
    const s = start.format(false) + " - " + end.format(false, true);
    if (bold) {
      return command("textbf", s);
    }
    return s;
  }

  itemize(items: string[]): void {
    this.add(command("begin", "itemize"));
    items.forEach((item) => this.add(command("item", item)));
    this.add(command("end", "itemize"));
  }

  texifyResume(): void {
    this.output = [];

    this.header();
    this.newLine();
    this.add(command("begin", "document"));

    this.title();
    this.info();
    this.newLine();
    this.section("Skills");
    for (const skill of this.data.skills) {
      this.add(command("textbf", skill.name + ":"));
      this.add(skill.skills.join(", "));
      this.add("");
    }
    this.newLine();
    this.section("Education");
    this.newLine();
    for (const education of this.data.educationsSorted()) {
      const left = [command("textbf", education.school), education.specialization];
      const right = [this.duration(education.timeFrame.start, education.timeFrame.end, true), education.level];
      this.splitText(left, right, 0.7);
      this.itemize([education.shortDescription]);
      this.newLine();
    }
    this.newLine();
    this.section("Memberships and Societies");
    for (const membership of this.data.membershipsSorted()) {
      const left = [command("textbf", membership.name), membership.category];
      const right = [command("textbf", membership.date.format(false)), membership.validity];
      this.splitText(left, right, 0.7);
      this.newLine();
    }
    this.newLine();
    this.section("Publications");
    this.newLine();
    for (const publication of this.data.publicationsSorted()) {
      const left = [command("textbf", publication.title), publication.publisher];
      const right = [command("textbf", publication.date.format(false)), publication.getCategoryString()];
      this.splitText(left, right, 0.8);
      this.newLine();
    }
    this.newLine();
    this.newPage();
    this.section("Experience");
    this.newLine();
    for (const work of this.data.worksSorted()) {
      const left = [command("textbf", work.title), work.companyName + " | " + work.mode];
      const right = [this.duration(work.interval.start, work.interval.end, true), work.field];
      this.splitText(left, right, 0.7);
      this.itemize([work.programmingLanguages.map((lang) => lang.name).join(", "), work.shortDescription]);
      this.newLine();
    }
    this.newLine();
    // this.section("Projects");
    // this.newLine();
    // for (const project of this.data.projectsSorted()) {
    //   const left = [command("textbf", project.name), project.subtitle];
    //   const right = [this.duration(project.interval.start, project.interval.end, true), project.relatedInstitution];
    //   this.splitText(left, right, 0.7);
    //   this.itemize([project.programmingLanguages.map((lang) => lang.name).join(", ")]);
    //   this.newLine();
    // }
    // this.newLine();
    this.section("Achievements");
    this.newLine();
    for (const achievement of this.data.achievementsSorted()) {
      const left = [command("textbf", achievement.name), achievement.achievement];
      const right = [
        this.duration(achievement.interval.start, achievement.interval.end, true),
        achievement.awardingInstitution,
      ];
      this.splitText(left, right, 0.7);
      this.newLine();
    }

    this.add(command("end", "document"));

    this.writeToFile("resume.tex");
  }

  texifyCoverLetter(cl: CoverLetter): void {
    this.output = [];
    this.header(25);
    this.fancyHeader(cl.company);

    this.newLine();
    this.add(command("begin", "document"));

    cl.paragraphs.forEach((p) => {
      this.add(p);
      this.add("");
    });

    this.add(command("end", "document"));

    this.writeToFile(`${cl.name}.tex`);
  }

  writeToFile(filename: string): void {
    writeFileSync(filename, this.output.join("\n"), { flag: "w" });
  }

  texifyCoverLetters(): void {
    for (const cl of this.data.coverLetters) {
      this.texifyCoverLetter(cl);
    }
  }
}

const data = initData();
const latex = new LaTeX(data);
latex.texifyResume();
// latex.texifyCoverLetters();
