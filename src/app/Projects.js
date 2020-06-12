export default class Projects {
  constructor(projects) {
    this.render(projects);
  }

  render({ projects }) {
    const converter = new showdown.Converter();
    const projectItems = projects.map((project, index) => ({
      ...project,
      description: converter.makeHtml(project.description),
      projectYear: function () {
        return new Date(this.projectDate).getFullYear();
      },
      projectIndex: function () {
        return (index + 1).toString().padStart(3, "0");
      },
    }));
    var template = document.getElementById("project-item").innerHTML;
    var rendered = Mustache.render(template, { projects: projectItems });
    document.getElementById("render-projects").innerHTML = rendered;
  }
}
