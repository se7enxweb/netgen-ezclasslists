// Lists by class: the filter form of the left menu reloads only the list.
// Plain JavaScript (fetch), no YUI. jQuery UI's date picker is used when the
// administration has loaded it; without it the dates are typed as YYYY-MM-DD.
var CLASSLISTS_MAIN_CONTENT_ID = 'ezclasslists-main-content';
var CLASSLISTS_DATE_FIELDS = [ 'createdDateFrom', 'createdDateTo', 'modifiedDateFrom', 'modifiedDateTo' ];

function classListsFilter( e, options )
{
    var content = document.getElementById( CLASSLISTS_MAIN_CONTENT_ID );
    if ( !content || typeof window.fetch !== 'function' || typeof window.URLSearchParams !== 'function' )
    {
        // The form is posted and the page reloads.
        return true;
    }
    e.preventDefault();

    classListsWait( options.loader );

    window.fetch( options.baseURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: buildPostData( e.target )
    } ).then( function( response ) {
        return response.text();
    } ).then( function( html ) {
        content.innerHTML = html;
    } ).catch( function() {
        // Fall back to a normal post of the form.
        e.target.submit();
    } );
    return false;
}

function classListsWait( imgLoader )
{
    var content = document.getElementById( CLASSLISTS_MAIN_CONTENT_ID );
    if ( !content )
    {
        return;
    }
    var p = document.createElement( 'p' );
    p.className = 'classlists-loader';
    var img = document.createElement( 'img' );
    img.src = imgLoader;
    img.alt = 'Loading...';
    p.appendChild( img );
    content.innerHTML = '';
    content.appendChild( p );
}

function classListsDateValue( id )
{
    var input = document.getElementById( id );
    if ( !input )
    {
        return null;
    }
    if ( typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.datepicker && jQuery.datepicker )
    {
        var date = jQuery( input ).datepicker( 'getDate' );
        return date !== null ? jQuery.datepicker.formatDate( 'yy-mm-dd', date ) : null;
    }
    var value = input.value.trim();
    return /^\d{4}-\d{2}-\d{2}$/.test( value ) ? value : null;
}

function buildPostData( form )
{
    var data = new URLSearchParams();

    data.append( 'classIdentifier', classListsGetSelectValue( 'classIdentifier' ) );
    data.append( 'sortMethod', classListsGetSelectValue( 'sortMethod' ) );
    data.append( 'sortOrder', classListsGetSelectValue( 'sortOrder' ) );

    CLASSLISTS_DATE_FIELDS.forEach( function( id ) {
        var value = classListsDateValue( id );
        if ( value !== null )
        {
            data.append( id, value );
        }
    } );

    var rootNode = document.getElementById( 'rootNodeId' );
    data.append( 'rootNodeId', rootNode && rootNode.value !== '' ? rootNode.value : 1 );

    var owner = document.getElementById( 'ownerUser' );
    data.append( 'ownerId', owner ? owner.value : 0 );

    // The form token (ezformtoken) of the form, if it has one.
    if ( form && form.querySelectorAll )
    {
        Array.prototype.forEach.call( form.querySelectorAll( 'input[type="hidden"]' ), function( input ) {
            if ( input.name && input.name.toLowerCase().indexOf( 'token' ) !== -1 )
            {
                data.append( input.name, input.value );
            }
        } );
    }

    data.append( 'ajax', 'true' );

    return data.toString();
}

function classListsGetSelectValue( selectID )
{
    var element = document.getElementById( selectID );
    if ( !element || element.selectedIndex < 0 )
    {
        return '';
    }
    return element.options[element.selectedIndex].value;
}
