<template>
  <link
    href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
    rel="stylesheet"
  />

  <header class="header">
    <h1 class="header__logo">
      <span class="movies">Movies</span>.<span class="vue">Vue</span>
    </h1>
    <div class="search-container">
      <input
        type="text"
        name="search"
        placeholder="Search for Movie"
        class="search-input"
      />
      <a href="#" class="search-btn">
        <i class="fas fa-search"></i>
      </a>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  margin: 10px 70px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    margin: 0;
    padding: 0;
    &:hover {
      cursor: pointer;
    }

    .movies {
      color: rgb(179, 60, 60);
    }

    .vue {
      color: rgb(61, 61, 114);
    }
  }
}

.search-container {
  background: #fff;
  height: 30px;
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.8s;
  text-shadow: 2px 2px 3px rgba(206, 66, 66, 0.5);
  box-shadow: 4px 4px 6px 0 rgba(175, 32, 32, 0.3),
    -2px -2px 4px 0 rgba(60, 102, 155, 0.2),
    -2px -2px 4px 0 rgba(148, 69, 69, 0.2), 4px 4px 6px 0 rgba(136, 34, 34, 0.2);
}

.search-container:hover > .search-input {
  width: 250px;
}

.search-container .search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 0px;
  font-weight: 500;
  font-size: 16px;
  transition: 0.5s;
}

.search-container .search-btn .fas {
  color: #e63e3e;
}

.search-container:hover {
  animation: hoverShake 0.15s linear 3;
}
</style>
