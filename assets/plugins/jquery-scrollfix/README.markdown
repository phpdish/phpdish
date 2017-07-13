# ScrollFix

jQuery plugin for making an element fixed when it goes out of view.

[Demo](http://htmlpreview.github.io/?http://github.com/ShiraNai7/jquery-scrollfix/blob/master/demo.html)


## Features

- detecting when an element goes out of view and making it fixed
- replacing the element with an invisible clone that will temporarily occupy the original spot
- updating size and position of the fixed element


## Browser support

Tested in Mozilla Firefox, Google Chrome, Safari, Opera and MSIE 7+


## Usage

The plugin provides a single jQuery method you can use:


### $(element).scrollFix([options])

- **element** - element that will be fixed
- **options** - object with various settings (see list below)


## Options

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>fixClass</th>
            <td>"scroll-fix"</td>
            <td>Class added to the element when it is fixed.</td>
        </tr>
        <tr>
            <th>fixTop</th>
            <td>0</td>
            <td>Top offset of the fixed element.</td>
        </tr>
        <tr>
            <th>fixOffset</th>
            <td>0</td>
            <td>Offset aplied when detecting whether to fix the element.</td>
        </tr>
        <tr>
            <th>unfixOffset</th>
            <td>0</td>
            <td>Offset aplied when detecting whether to unfix the element.</td>
        </tr>
        <tr>
            <th>syncSize</th>
            <td>true</td>
            <td>Update element's size when it is fixed.</td>
        </tr>
        <tr>
            <th>syncPosition</th>
            <td>true</td>
            <td>Update element's position when it is fixed.</td>
        </tr>
        <tr>
            <th>style</th>
            <td>true</td>
            <td>Apply <code>position: fixed</code> and <code>top: ..px</code> directly to the element when it is fixed. Disable this if you wish to style the element through your own CSS rules using the <strong>fixClass</strong> (example: <code>#myElement.scroll-fix {position: fixed;}</code>).</td>
        </tr>
        <tr>
            <th><del>onUpdateFixed</del></th>
            <td>null</td>
            <td>Custom function to call when the fixed element is updated. The function is passed an instance of <code>Shira.ScrollFix.Watcher</code>.<br><br>This option is deprecated. Use DOM events instead.</td>
        </tr>
    </tbody>
</table>


## DOM events

List of dom events dispatched by the watcher:

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>fix.shira.scrollfix</th>
            <td>fired before the element is fixed; calling <code>e.preventDefault()</code> will prevent fixing</td>
        </tr>
        <tr>
            <th>fixed.shira.scrollfix</th>
            <td>fired after the element has been fixed</td>
        </tr>
        <tr>
            <th>update.shira.scrollfix</th>
            <td>fired after a fixed element has been updated</td>
        </tr>
        <tr>
            <th>unfix.shira.scrollfix</th>
            <td>fixed before the element is unfixed; calling <code>e.preventDefault()</code> will prevent unfixing</td>
        </tr>
        <tr>
            <th>unfixed.shira.scrollfix</th>
            <td>fired after the element has been unfixed</td>
        </tr>
    </tbody>
</table>

All of the event objects have a property called `watcher` that contains an instance of `Shira.ScrollFix.Watcher`.


### Example

    $('#myelement')
        // listen to the "fixed" and "unfixed" events
        .on('fixed.shira.scrollfix unfixed.shira.scrollfix', function (e) {
            // make the background green when fixed, red otherwise
            $(this).css('background-color', e.watcher.fixed ? 'green' : 'red');
        })

        // apply scrollfix
        .scrollFix()
    ;


## Data

The following data attributes are available after the plugin is applied to an element.

Call `$(element).data('key')` to access the value.

- `shira.scrollfix` - instance of `Shira.ScrollFix.Watcher`
