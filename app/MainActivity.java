meu-chatgpt-android
Repository navigation
Code
Issues
Pull requests
meu-chatgpt-android/app/src/main/java/com/meuchatgpt/app
/
MainActivity.java
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

No wrap
Editing MainActivity.java file contents
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28

package com.meuchatgpt.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        WebView web = new WebView(this);

        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);

        web.setWebViewClient(new WebViewClient());
        setContentView(web);

        web.loadUrl("file:///android_asset/index.html");
    }
}

Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
Commit changes
There was an error committing your changes: A file with the same name already exists. Please choose a different name and try again.
Commit message
Create MainActivity.java
Extended description
Add an optional extended description...

Direct commit or PR

Commit directly to the main branch

Create a new branch for this commit and start a pull request Learn more about pull requests
