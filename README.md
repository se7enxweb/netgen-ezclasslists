Lists by class for Exponential (ezclasslists)
=============================================

Lists by class adds a **Lists by class** tab to the Exponential administration. It lists the
content of the site by content class, across the whole tree or in one subtree, filtered by
creation and modification dates and by owner, and lets you open, edit or remove the objects
straight from the list, several at a time.

It is for editors and administrators who need answers such as "all articles modified since
Monday", "every image under this folder" or "the blog posts this user owns", and for cleaning up
content of one type without walking the content tree.

Contents
--------

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Template fetch function](#template-fetch-function)
- [Permissions](#permissions)
- [Upgrading](#upgrading)
- [Known limits](#known-limits)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Credits and history](#credits-and-history)

Features
--------

- **A list of the nodes of one class, or of all classes**, sorted by modification date,
  publication date, name, depth, path, priority or section, ascending or descending, 10, 25 or 50
  per page.
- **Filters**: a subtree (chosen in the content browser), created since/until, modified
  since/until and the owner (any user of the configured user groups).
- **Content in subtree by class**: a table of how many nodes of each class the chosen subtree
  holds, each linked to its list.
- **Edit and remove from the list**: an edit button on each row, and removal of the selected
  nodes, to the trash or for good, with a confirmation.
- **"Class list under node"** in the content tree's context menus opens the list for that subtree;
  the class menu and the object count on a class's page link to the list of that class.
- **Its own admin tab**, "Lists by class". In the admin4 design the tab shows the list-ul icon
  before its name.
- English and French texts.

Requirements
------------

- Exponential 6.x, with an administration siteaccess
- PHP 8.0 or later
- Optional: jQuery UI in the administration, for date pickers on the date fields (without it the
  dates are typed as `YYYY-MM-DD`)

Installation
------------

### With Composer

From the root of the Exponential installation:

```bash
composer require se7enxweb/netgen-ezclasslists
```

The Exponential legacy installer places the package in `extension/ezclasslists`.

### By hand

1. Download the latest release from https://github.com/se7enxweb/netgen-ezclasslists/releases
   (or `git clone https://github.com/se7enxweb/netgen-ezclasslists.git`).
2. Copy the folder to `extension/ezclasslists`. The folder name must be `ezclasslists`: the
   settings and the content action handler refer to it.

### Activate it

Activate it for the admin siteaccess, in
`settings/siteaccess/<admin siteaccess>/site.ini.append.php`:

```ini
[ExtensionSettings]
ActiveAccessExtensions[]=ezclasslists
```

or for every siteaccess, in `settings/override/site.ini.append.php`:

```ini
[ExtensionSettings]
ActiveExtensions[]=ezclasslists
```

Then regenerate the autoloads and clear the caches, from the installation root:

```bash
php bin/php/ezpgenerateautoloads.php -e
php bin/php/ezcache.php --clear-all
```

Configuration
-------------

The settings are in `extension/ezclasslists/settings/lists.ini.append.php`. Override them in
`settings/override/lists.ini.append.php`:

```ini
<?php /* #?ini charset="utf-8"?

[DeleteSettings]
# Ask for a confirmation before removing the selected nodes.
ConfirmJavascript=enabled
# Whether "Move to trash" is checked when the list opens.
DefaultMoveToTrash=enabled

[ListSettings]
# The default sort: depth, modified, name, path, path_string, priority, published or section.
DefaultSortMethod=modified
# ascending or descending
DefaultSortOrder=descending
# Only these classes (identifiers) in the class menu; empty: every class.
IncludeClasses[]
#IncludeClasses[]=article
#IncludeClasses[]=image

[Users]
# The user groups (node ids) whose users are offered in the Owner filter.
UserGroupIds[]
UserGroupIds[]=13
# The class of those users.
UserClassIdentifiers=user

*/ ?>
```

The extension also adds to:

- `menu.ini`: the tab `[Topmenu_classlists]` (name, tooltip, icon, `PolicyList[]=classlists/read`);
- `admininterface.ini`: the "Class list under node" entries of the context menus;
- `browse.ini`: `[CustomBrowse]`, the content browser used to choose the subtree (it starts at
  node 2);
- `content.ini`: its content action handler, which opens that browser;
- `module.ini`, `design.ini` (its templates and `classlists.js`) and `site.ini` (translations).

The number of rows per page is the user's preference `admin_classlists_limit` (1 = 10, 2 = 25,
3 = 50), set with the links above the list.

Usage
-----

1. Sign in to the administration and open the **Lists by class** tab (`/classlists/list`).
2. In the left menu choose a class (or "Any class"), the sort and the order, optionally the dates
   and the owner, and press the filter button. The list is reloaded in place.
3. To limit the list to a subtree, press **Select content subtree**, pick a node in the browser,
   and filter again. **Content in subtree by class** then shows how many nodes of each class the
   subtree holds.
4. Click a name to open the node, the edit icon to edit it, or check several rows, choose
   whether to **Move to trash**, and press **Remove selected**. Only nodes you may remove are
   removed.

The list's address holds the class, the sort and the subtree, so a view can be bookmarked:

```
/classlists/list/article/published/descending/2
/classlists/list/image/modified/ascending/54/(offset)/25
```

The ordered parameters are the class identifier (or id), the sort method, the sort order and the
root node id; the filters are view parameters: `(createdDateFrom)`, `(createdDateTo)`,
`(modifiedDateFrom)`, `(modifiedDateTo)` (timestamps), `(ownerId)`, `(rootNodeId)` and
`(offset)`.

From the content tree, right-click a node and choose **Class list under node** to open the list
for its subtree.

Template fetch function
-----------------------

`classlists/subtree_class_list` counts the nodes of each class below a node (the node itself not
included), most frequent first. Each row has `class_identifier`, `class_id` and `count`:

```
{def $classes = fetch( 'classlists', 'subtree_class_list', hash( 'parent_id', 2 ) )}
<ul>
{foreach $classes as $row}
    <li>{$row.class_identifier|wash}: {$row.count}</li>
{/foreach}
</ul>
```

It counts every node, without checking the current user's read access, so use it in the
administration or for figures that are not secret.

Permissions
-----------

The list needs the policy **classlists/read**. Removing nodes from the list also needs the user's
normal permission to remove each node; nodes they may not remove are skipped. Editing opens the
normal content edit, with its own permission checks.

Upgrading
---------

1. Replace the extension's folder with the new release
   (`composer update se7enxweb/netgen-ezclasslists`, or copy the new files over the old ones).
2. Regenerate the autoloads and clear the caches (see [Activate it](#activate-it)).
3. Read [CHANGELOG.md](CHANGELOG.md).

Known limits
------------

- With JavaScript switched off the filter form still posts, but the dates and the owner are not
  kept in the address the page is redirected to; filter with JavaScript on, or write the view
  parameters into the address.
- The date pickers need jQuery UI, which the extension does not load itself.
- The templates are made for the admin designs; there is no page for public siteaccesses.

Troubleshooting
---------------

- **The tab is missing.** Check that the extension is active for the admin siteaccess, clear the
  caches, and give your role `classlists/read`.
- **The tab has no icon.** Icons are drawn by the admin4 design; older admin designs show the
  name only.
- **The Owner list is empty.** Set `[Users] UserGroupIds[]` to the node ids of your user groups.
- **A class is missing from the menu.** `[ListSettings] IncludeClasses[]` limits the menu; empty it
  to list every class.
- **A date filter is ignored.** Enter the date as `YYYY-MM-DD`.

Bug reports: https://github.com/se7enxweb/netgen-ezclasslists/issues

Contributing
------------

Pull requests are welcome at https://github.com/se7enxweb/netgen-ezclasslists. Translations go in
`translations/<locale>/translation.ts` (context `classlists/list`).

License
-------

Lists by class is licensed under the GNU General Public License v2.0; see [GPL](GPL).

Credits and history
-------------------

Damien Pobel wrote eZ Class Lists between 2007 and 2011 as an extension for eZ Publish, the
content management system that preceded Exponential, and published it on projects.ez.no. Netgen
(Edi Modrić, Ivan Herak, Petar Španja) maintained it from 2013 as `netgen/ezclasslists`
(https://github.com/netgen/ezclasslists) and added the subtree, date and owner filters and the
subtree count in 2019. 7x maintains this fork for Exponential as `se7enxweb/netgen-ezclasslists`.

- Copyright (C) 1999 - 2011 Damien Pobel
- Copyright (C) 1998 - 2026 7x
