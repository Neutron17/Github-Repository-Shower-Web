class Project extends HTMLElement {
    get name() { return this.getAttribute("name"); }
    get desc() { return this.getAttribute("desc"); }
    get archived() { return this.getAttribute("archived"); }
    get url() { return this.getAttribute("url"); }
    get lang() { return this.getAttribute("lang"); }
    set name(value) {  }
    constructor() {
        super()
        this._internals = this.attachInternals();
        this.addEventListener("click", () => {
            console.log(this.url)
            window.open(this.url);
        });
    }
    connectedCallback() {
        // Warning: XSS possible with any of these
        let str = "<article class=\"project\"><h1>"+ this.name+ "</h1><p>"+this.desc+"</p><p>Language: "+this.lang+"</p>";
        if(this.archived == "true")
            str += "<p>note: Archived</p>";
        str += "</article>";
        this.innerHTML = str;
    }
}

customElements.define('project-prototype', Project);