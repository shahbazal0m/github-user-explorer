let searchBtn = document.querySelector(".searchBtn");
let usernameInput = document.querySelector(".usernameInput");
let card = document.querySelector(".card");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not found.");
    return raw.json();
  });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`).then((raw) => {
    if (!raw.ok) throw new Error("Failed to fetch repos..");
    return raw.json();
  });
}

function decorateProfileData(details) {
  let data = `<div id="userProfile" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Profile Card -->
          <div
            class="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 shadow-lg"
          >
            <div class="flex items-center gap-4">
              <!-- Avatar Placeholder -->
              <img
                src="${details.avatar_url}"
                alt="GitHub Avatar"
                class="h-20 w-20 rounded-full border border-slate-700 object-cover bg-slate-800"
              />
              <div>
                <h3 class="text-lg font-semibold">${details.name}</h3>
                <p class="text-sm text-slate-400">@${details.login}</p>
              </div>
            </div>

            <p class="mt-6 text-sm text-slate-300 leading-relaxed">
              ${details.bio ? details.bio : "Sorry there is no bio..."}
            </p>

            <div class="mt-6 flex flex-wrap gap-6">
              <div>
                <p class="text-lg font-semibold">${details.public_repos}</p>
                <p class="text-xs text-slate-400">Repositories</p>
              </div>
              <div>
                <p class="text-lg font-semibold">${details.followers}</p>
                <p class="text-xs text-slate-400">Followers</p>
              </div>
              <div>
                <p class="text-lg font-semibold">${details.following}</p>
                <p class="text-xs text-slate-400">Following</p>
              </div>
            </div>
          </div>

          <!-- Info Cards -->
          <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Profile Information -->
            <div
              class="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h4 class="text-sm font-medium text-slate-300 mb-4">
                Profile Information
              </h4>
              <ul class="space-y-3 text-sm">
                <li class="flex justify-between">
                  <span class="text-slate-400">Company</span><span>${details.company ? details.company : "N/A"}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-slate-400">Location</span><span>${details.location}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-slate-400">Email</span><span>${details.email ? details.email : "Not publicly available"}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-slate-400">Website</span
                  ><span>${details.blog ? details.blog : "Not available"}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-slate-400">Joined</span><span>${details.created_at}</span>
                </li>
              </ul>
            </div>

            <!-- Account Status -->
            <div
              class="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h4 class="text-sm font-medium text-slate-300 mb-4">
                Account Status
              </h4>
              <ul class="space-y-3 text-sm">
                <li class="flex justify-between">
                  <span class="text-slate-400">Public Gists</span><span>${details.public_gists}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-slate-400">Account Type</span><span>${details.type}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-slate-400">Hireable</span><span>${details.hireable ? details.hireable : "Not specified"}<span>
                </li>
                <li class="flex justify-between">
                  <span class="text-slate-400">Last Update</span><span>${details.updated_at}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>`;
    card.innerHTML = data;       
}

searchBtn.addEventListener("click", function () {
  let username = usernameInput.value.trim();
  if (username.length > 0) {
    getProfileData(username).then((data) => {
      decorateProfileData(data);
    });
  } else {
    alert();
  }
});
