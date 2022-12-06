import { project } from "../types";

function getBranches(res: any): string[] {
  const branches = res.map((branch: any) => {
    return branch.name;
  });
  return branches as string[];
}

function getUrls(branches: string[]): string[] {
  return branches.map((branch) => {
    return `https://react-practice-git-${branch}-randreu28.vercel.app/`;
  });
}

async function getDates(res: any) {
  const rawDates = await Promise.all(
    res.map(async (resData: any) => {
      const commitData = await fetch(resData.commit.url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GH_API_KEY}`,
        },
      });
      return commitData.json();
    })
  );

  const dates = rawDates.map((date) => date.commit.author.date);

  return dates;
}

async function getReadMes(branches: string[]) {
  const downloadUrls = await Promise.all(
    branches.map(async (branch) => {
      const raw = await fetch(
        `https://api.github.com/repos/randreu28/react-practice/readme?ref=${branch}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GH_API_KEY}`,
          },
        }
      );

      const res = await raw.json();

      return res.download_url;
    })
  );

  const readMes = await Promise.all(
    downloadUrls.map(async (url) => {
      const raw = await fetch(url);

      return raw.text();
    })
  );

  return readMes;
}

export default async function getProjects() {
  const rawRes = await fetch(
    "https://api.github.com/repos/randreu28/react-practice/branches",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GH_API_KEY}`,
      },
    }
  );

  const res = await rawRes.json();

  const branches = getBranches(res);
  const urls = getUrls(branches);
  const dates = await getDates(res);
  const descriptions = await getReadMes(branches);

  const projects: project[] = res.map((_: any, index: number) => {
    return {
      name: branches[index],
      date: dates[index],
      url: urls[index],
      description: descriptions[index],
    };
  });

  /* Removes master branch */
  const filteredProjects = projects.filter(
    (project) => project.name != "master"
  );

  return filteredProjects;
}
