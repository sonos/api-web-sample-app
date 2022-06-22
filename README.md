# pdsw-repo-template

A template repo to base other repos on

---

# repo-template

[![GitHub license](https://img.shields.io/badge/license-UNLICENSED-blue.svg?style=for-the-badge)](.//LICENSE)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/Sonos-Inc/pdsw-apigee-agproxytool/graphs/commit-activity)
![Release](https://img.shields.io/badge/release-1.1.0-orange.svg?style=for-the-badge)

More badges can be found at [shields.io](https://shields.io/).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Release Notes](#release-notes)
- [Overview](#overview)
- [Requirements](#requirements)
- [Installation/Setup](#installationsetup)
- [Usage](#usage)
- [Contents](#contents)
- [Configuration & Best Practices](#configuration--best-practices)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Release Notes

| Version    | Description                                             |
| :--------: | ------------------------------------------------------- |
| 0.1.0-beta | <ul><li>Initial release!</li></ul> |
| 0.2.0      | <ul><li>Added .gitignore</li></ul> |
| 0.5.0      | <ul><li>Altered `README.md`</li></ul> |
| 1.0.0      | <ul><li>1.0.0 release!</li></ul> |
| 1.1.0      | <ul><li>Added `LICENSE` information</li></ul> |

# Overview

This repository is meant to be a template with which to base other repos upon. This includes both the files contained within this repo as well as the configuration of this repository itself. Some inspiration was taken from [this baserepo](https://github.com/Sonos-Inc/pdsw-ops-baserepo).

Contributions to this template are encouraged.

# Requirements

None

# Installation/Setup

How to get up and running with your repo, for example:

To utilize this repo:
1. Select `Use This Template` above
2. Enter a repo name
3. Use your new repo

# Usage

Once cloned, a .gitignore file can be selected from `gitignorefiles` or the default `.gitignore` can be used. From there, your application or service can be added.

# Contents

These are the template files included in this repo.

```
template-repo
│   README.md
|   README-TEMPLATE.md
│   .gitignore  
|   LICENSE
|   MIT_LICENSE 
└───.github
│   │   CODEOWNERS
│   │   delete-merged-branch-config.yml
│   │   labeler.yml
│   │   release-drafter.yml
└───gitignorefiles
|   |   README.md
│   │   gradle.ignore
│   │   java.ignore
|   |   ...
```

| File/Folder           | Description                                             |
| :---------:           | ------------------------------------------------------- |
| ./README-TEMPLATE.md  | <ul>Template README file</ul> |
| ./.gitignore          | <ul>A good, default .gitignore file</ul> |
| ./LICENSE/MIT_LICENSE | <ul>LICENSE file for repo. Either LICENSE or MIT_LICENSE can be used depending on your needs</ul> |
| .github/              | <ul>Includes configuration files necessary for Integrations (i.e. automatic branch deletion)</ul> |
| gitignorefiles/       | <ul>.ignore files for different languages and setups. Use these to create your own .gitignore that applies to your project</ul> |

# Configuration & Best Practices

It is best to follow a `feature -> develop -> main` workflow for branch management. Features should be on their own `feature` branch and merged into the `develop` branch. The `develop` branch should be merged once ready for release into `main`.

You will also want to configure access to your repo under `Settings -> Collaborators & Teams`.

The following Integrations/Services are required for full functionality of this repo:
- [Delete merged branch](https://probot.github.io/apps/delete-merged-branch/)
- [issuelabeler](https://github.com/apps/issuelabeler)
- [Release Drafter](https://github.com/apps/release-drafter)