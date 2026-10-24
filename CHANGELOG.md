Lists by class (ezclasslists) changelog
=======================================

The changes of each release, newest first. Earlier releases are described by their tags
(https://github.com/se7enxweb/netgen-ezclasslists/tags).

2.1.2 (2026-10-24)
------------------

- Updated: composer.json replaces netgen/ezclasslists. Both packages install into
  extension/ezclasslists, and Netgen's 2.1.0 still asks the admin for `ezjsc::yui2`, which
  Exponential 6 no longer has: every admin page logged "Could not find function:
  ezjscServerFunctionsJs::yui2()" and the filter form stopped at "YUILoader is not defined". A
  project that requires this package next to one that requires netgen/ezclasslists ^2.1
  (site-legacy-bundle does) now installs this package once. The filter form needs no script
  library: it uses fetch, and jQuery UI's date picker when the admin has loaded it, so it works on
  every kernel, with or without YUI.
- Updated: dev-master is aliased to 2.1.x-dev.
- Fixed: list.tpl gives the rows' alternating styles with `sequence`; the old
  `array( ... ) as $style` form logged "Unknown parameter 'as'" and "No variable name found" on
  every request of the tab.
- Fixed: menu.tpl reads the subtree chosen in the browse page only when it was posted (no
  "Unknown post variable 'SelectedNodeIDArray'" error on every request), closes its condition and
  takes the first selected node with `.0`.

2.1.1 (2026-10-21)
------------------

- Updated: The Lists by class tab of the top menu shows the list-ul icon in the admin4 design
  (`Icon=list-ul` in [Topmenu_classlists] of menu.ini.append.php). Older admin designs ignore
  the setting.
- Fixed: The filter form works without YUI, which Exponential 6 no longer ships: it reloads the
  list with fetch and sends its form token. jQuery UI's date picker is used when it is loaded;
  dates are written and shown as YYYY-MM-DD. The `ezjsc::yui2` script entry is removed.
- Fixed: An empty or invalid date field no longer ends the request with a fatal error when the
  form is posted without JavaScript.
- Fixed: The subtree count (`subtree_class_list`) casts its node id to an integer before it
  reaches the SQL query.
- Fixed: The class links of the subtree count open that class's list.
- Updated: The package is published as se7enxweb/netgen-ezclasslists. composer.json requires
  PHP 8.0 and the Exponential legacy installer, links the issues and the source, and lists
  Damien Pobel, Netgen and 7x as maintainer.
- Updated: ezinfo.php (it said 1.2) and the new extension.xml state the release, the copyright,
  the license and the website.
- Updated: README.md replaces the one-line README: installation with Composer and by hand,
  settings, usage with example addresses, the fetch function, permissions, known limits and
  troubleshooting.
- Added: This changelog.

