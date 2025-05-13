document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchResultsDiv = document.getElementById('searchResults');
  let searchIndex;
  let documents = []; // 存储从 JSON 加载的原始文档数据

  // 1. 加载搜索数据并构建 Lunr 索引
  async function loadSearchDataAndBuildIndex() {
    try {
      const response = await fetch('search-data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      documents = await response.json();

      // 初始化 Lunr.js 索引
      searchIndex = lunr(function () {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('content');

        documents.forEach(function (doc) {
          this.add(doc);
        }, this);
      });

    } catch (error) {
      console.error("加载或构建搜索索引失败:", error);
      searchResultsDiv.innerHTML = "<p>搜索功能暂时无法使用，请稍后再试。</p>";
    }
  }

  // 2. 显示搜索结果
  function displayResults(resultsFromLunr) {
    searchResultsDiv.innerHTML = '';

    if (!resultsFromLunr || resultsFromLunr.length === 0) {
      searchResultsDiv.innerHTML = '<p>没有找到与您的查询匹配的内容。</p>';
      return;
    }

    const ul = document.createElement('ul');
    ul.className = 'post-list';

    resultsFromLunr.forEach(result => {
      const doc = documents.find(d => d.id.toString() === result.ref);
      if (doc) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = doc.url;
        a.textContent = doc.title;
        li.appendChild(a);

        if (doc.date) {
          const dateSpan = document.createElement('span');
          dateSpan.textContent = doc.date;
          li.appendChild(dateSpan);
        }

        ul.appendChild(li);
      }
    });
    searchResultsDiv.appendChild(ul);
  }

  // 3. 处理搜索输入
  searchInput.addEventListener('keyup', function (event) {
    const query = event.target.value.trim();

    if (!searchIndex) {
      searchResultsDiv.innerHTML = "<p>搜索功能正在初始化，请稍候...</p>";
      return;
    }

    if (query === '') {
      searchResultsDiv.innerHTML = '';
      return;
    }

    try {
      const lunrResults = searchIndex.search(query);
      displayResults(lunrResults);
    } catch (e) {
      console.error("搜索出错:", e);
      searchResultsDiv.innerHTML = "<p>搜索过程中发生错误。</p>";
    }
  });

  // 初始化：加载数据并构建索引
  loadSearchDataAndBuildIndex();
}); 