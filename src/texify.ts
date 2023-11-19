import { Data } from "./data";

function command(name: string, params: string[], args: string[]): string {
    const paramstring = params.length > 0 ? `[${params.join(",")}]` : "";
    return `\\${name}${paramstring}{${args.join(",")}}`;
}

function block(name: string, content: string): string {
    return `\\begin{${name}}\n${content}\n\\end{${name}}`;
}

class LaTeX {
    readonly data: Data;
    output: string[];

    constructor() {
        this.data = Data.init();
        this.output = [];
    }

    writeHeader(): void {
        console.log(command("documentclass", ["a4paper", "11pt"], ["article"]));
        console.log(command("usepackage", ["a4paper", "total={18cm, 27cm}"], ["geometry"]));
        console.log(command("usepackage", ["parfill"], ["parskip"]));
        console.log(command("usepackage", ["utf8"], ["inputenc"]));
    }

    texify(): void {
        this.writeHeader();
        console.log("\\begin{document}");

        console.log(block("center", block("huge", command("textbf", [], [this.data.firstName + " " + this.data.lastName]))));

        console.log("\\end{document}");
    }
}

const latex = new LaTeX();
latex.texify();
