import { Data, TimePoint } from "./data";

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

    constructor() {
        this.data = Data.init();
        this.output = [];
    }

    header(): void {
        this.output.push(define("documentclass", "article", ["a4paper", "11pt"]));
        this.output.push(define("usepackage", "geometry", ["a4paper", "total={18cm, 27cm}"]));
        this.output.push(define("usepackage", "parskip", ["parfill"]));
        this.output.push(define("usepackage", "inputenc", ["utf8"]));
        this.output.push(define("usepackage", "fontenc", ["T1"]));
    }

    title(): void {
        this.output.push(block("center", block("Huge", command("textbf", command("textsc", this.data.fullName())))));
    }

    info(): void {
        const contacts: string[] = ["", "", "", ""];
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
        this.output.push(block("center", contacts.join(" " + mathcommand("cdot") + " ")));
    }

    newLine(): void {
        this.output.push("");
    }

    section(title: string): void {
        this.output.push(command("section*", command("textsc", title)));
        this.output.push(command("hrule",));
    }

    splitText(left: string[], right: string[], firstwidth = 0.5): void {
        this.output.push(command("begin", "minipage", ["t"], `${firstwidth}\\textwidth`));
        this.output.push(command("begin", "flushleft"));
        left.forEach((line) => this.output.push(line, ""));
        this.output.push(command("end", "flushleft"));
        this.output.push(command("end", "minipage"));
        this.output.push(command("begin", "minipage", ["t"], `${Math.round((1 - firstwidth) * 100) / 100}\\textwidth`));
        this.output.push(command("begin", "flushright"));
        right.forEach((line) => this.output.push(line, ""));
        this.output.push(command("end", "flushright"));
        this.output.push(command("end", "minipage"));
    }

    duration(start: TimePoint, end: TimePoint, bold: boolean): string {
        const s = start.format(false) + " - " + end.format(false);
        if (bold) {
            return command("textbf", s);
        }
        return s;
    }

    itemize(items: string[]): void {
        this.output.push(command("begin", "itemize"));
        items.forEach((item) => this.output.push(command("item", item)));
        this.output.push(command("end", "itemize"));
    }

    texify(): void {
        this.header();
        this.newLine();
        this.output.push(command("begin", "document"));

        this.title();
        this.info();
        this.newLine();
        this.section("Skills");
        for (const skill of this.data.skills) {
            this.output.push(command("textbf", skill.name + ":"));
            this.output.push(skill.skills.join(", "));
            this.output.push("");
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
        this.section("Publications");
        this.newLine();
        for (const publication of this.data.publicationsSorted()) {
            const left = [command("textbf", publication.title), publication.publisher];
            const right = [command("textbf", publication.date.format(false)), publication.getCategoryString()];
            this.splitText(left, right, 0.8);
            this.newLine();
        }
        this.newLine();
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
        this.section("Projects");
        this.newLine();
        for (const project of this.data.projectsSorted()) {
            const left = [command("textbf", project.name), project.subtitle];
            const right = [this.duration(project.interval.start, project.interval.end, true), project.relatedInstitution];
            this.splitText(left, right, 0.7);
            this.itemize([project.programmingLanguages.map((lang) => lang.name).join(", ")]);
            this.newLine();
        }
        this.newLine();
        this.section("Achievements");
        this.newLine();
        for (const achievement of this.data.achievementsSorted()) {
            const left = [command("textbf", achievement.name), achievement.achievement];
            const right = [this.duration(achievement.interval.start, achievement.interval.end, true), achievement.awardingInstitution];
            this.splitText(left, right, 0.7);
            this.newLine();
        }


        this.output.push(command("end", "document"));

        this.output.forEach((line) => console.log(line));
    }
}

const latex = new LaTeX();
latex.texify();
