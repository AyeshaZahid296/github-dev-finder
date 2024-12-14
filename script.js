  function getUser() {
            const searchButton = document.getElementById("searchButton");
            const usernameInput = document.getElementById("usernameInput");
            const userProfile = document.getElementById("userProfile");

            searchButton.addEventListener("click", () => {
                const username = usernameInput.value.trim();
                if (!username) {
                    userProfile.innerHTML = `<p class="error">⚠️ Please enter a valid username!</p>`;
                    return;
                }

                fetch(`https://api.github.com/users/${username}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("User not found");
                        }
                        return response.json();
                    })
                    .then((user) => {
                        const reposUrl = user.repos_url;
                        fetch(reposUrl)
                            .then((response) => response.json())
                            .then((repos) => {
                                const repoLinks = repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join("");
                                userProfile.innerHTML = `
                                    <div>
                                
                                        <img src="${user.avatar_url}" alt="Avatar" />
                                        <h2>${user.name || "No Name"}</h2>
                                        <p>${user.bio || "No bio available"}</p>
                                        <p><strong>Location:</strong> ${user.location || "Not available"}</p>
                                        <p><strong>Followers:</strong> ${user.followers}</p>
                                        <p><strong>Following:</strong> ${user.following}</p>
                                        <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
                                        <p><a href="${user.html_url}" target="_blank">View GitHub Profile</a></p>
                                        <h3>Public Repositories:</h3>
                                        <ul>
                                        ${repoLinks}
                                        </ul>
                                    </div>
                                `;
                            });
                    })
                    .catch((error) => {
                        userProfile.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
                    });
            });
        }

        getUser();