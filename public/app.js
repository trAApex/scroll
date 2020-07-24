const state = {
  selectedPageIndex: 0,
  comments: [],
  slicedComments: [],
  itemsPerPage: 50
};

window.onload= async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await ( res.ok ? res.json() : Promise.resolve([]));
  state.comments = comments;
  state.slicedComments = comments.slice(0, state.itemsPerPage);
  console.log(state);
  render();
}

function navigate(selectedPageIndex) {
  console.log(selectedPageIndex);
  state.selectedPageIndex = selectedPageIndex;
  const start = state.itemsPerPage * selectedPageIndex;
  const end = start + state.itemsPerPage;
  state.slicedComments = state.comments.slice(start, end);
  console.log(state);
  render();
}

function render() {

  const numberOfPages = Math.ceil(state.comments.length / state.itemsPerPage);
  console.log(numberOfPages);

  const indexes = Array.from(Array(numberOfPages).keys());
  console.log(indexes);

  const buttons = indexes.map(
    (num, i) => `
      <li class="page-item ${state.selectedPageIndex === i ? "active" : ""}">
        <span class="page-link" onClick="navigate(${num})">
          ${num + 1}
        </span>
      </li>
    `
  );

  document.getElementById('comments-component').innerHTML = `
    <div class="border" style="height: calc(100vh - 100px); overflow-y: scroll">
      ${state.slicedComments.reduce(
        (acc, cr) =>
          acc +
          `<div class="list-group-item">
            #${cr.id} ${cr.email} <br>
            <small>${cr.body}</small>
          </div>`,
        ""
      )}
    </div>

    <nav>
      <ul class="pagination">
        ${buttons.join('')}
      </ul>
    </nav>
  `;

}
