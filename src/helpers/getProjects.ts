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

async function getDate(url: string) {
  const rawRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GH_API_KEY}`,
    },
  });

  const res = await rawRes.json();
  return res.commit.author.date;
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

  const projects: project[] = await Promise.all(
    res.map(async (resData: any, index: number) => {
      return {
        name: branches[index],
        date: await getDate(resData.commit.url),
        url: urls[index],
      };
    })
  );

  /* Removes master branch */
  const filteredProjects = projects.filter(
    (project) => project.name != "master"
  );

  return filteredProjects;
}
