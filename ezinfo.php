<?php
//
// $Id: ezinfo.php 21 2011-06-22 20:24:05Z dpobel $
// $HeadURL: http://svn.projects.ez.no/ezclasslists/tags/ezclasslists_1_2/ezclasslists/ezinfo.php $
//
// Created on: <30-May-2009 16:57 damien pobel>
//
// SOFTWARE NAME: Lists by class (ezclasslists)
// COPYRIGHT NOTICE: Copyright (C) 1999-2011 Damien POBEL, 1998-2026 7x
// SOFTWARE LICENSE: GNU General Public License v2.0
// NOTICE: >
//   This program is free software; you can redistribute it and/or
//   modify it under the terms of version 2.0  of the GNU General
//   Public License as published by the Free Software Foundation.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of version 2.0 of the GNU General
//   Public License along with this program; if not, write to the Free
//   Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//   MA 02110-1301, USA.

class ezclasslistsInfo
{
    public static function info()
    {
        return array(
            'Name'      => '<a href="https://github.com/se7enxweb/netgen-ezclasslists">Lists by class</a> (ezclasslists)',
            'Version'   => '2.1.0',
            'Author'    => 'Damien Pobel, Netgen and 7x',
            'Copyright' => 'Copyright &copy; 1999 - 2011 Damien Pobel and 1998 - ' . date( 'Y' ) . ' 7x',
            'License'   => 'GNU General Public License v2.0',
            'Info_url'  => 'https://github.com/se7enxweb/netgen-ezclasslists'
        );
    }
}
