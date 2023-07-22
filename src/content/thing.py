import yaml

with open("events.yml", "r") as stream:
    try:
        for x in yaml.safe_load(stream)["events"]:
            title = x["title"].lower().replace("lightning talk: ", "").replace(" ", "-").replace(",", "").replace("(", "").replace(")", "")
            with open(f'{title}.mdx', 'w') as f:
                f.writelines(f'---\ntitle: \"{x["title"]}\"\ndate: {x["date"]}\nlocation: \"{x["location"]}\"\n---\n{x.get("description", "")}')
    except yaml.YAMLError as exc:
        print(exc)