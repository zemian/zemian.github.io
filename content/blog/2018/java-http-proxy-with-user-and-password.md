Title: Java Http Proxy with User and Password
Date: 2018-03-16 00:00:00-05:00
Tags: java-http-proxy



File: `scratch\_1.java`

```
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URL;

public class scratch_1{
    public static void main(String[] args) throws Exception {
        System.setProperty("java.util.logging.config.file", "java-logging.properties");

        System.setProperty("http.proxyHost", "proxy.mycompany.com");
        System.setProperty("http.proxyPort", "8080");
        System.setProperty("http.nonProxyHosts", "*.mycompany.com");
        System.setProperty("https.proxyHost", "proxy.mycompany.com");
        System.setProperty("https.proxyPort", "8080");
        System.setProperty("https.nonProxyHosts", "*.mycompany.com");

        Authenticator.setDefault(
            new Authenticator() {
                @Override
                public PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("zemian", "test123".toCharArray());
                }
            }
        );

        URL url = new URL("http://some.external.site.com");
        //URL url = new URL("http://myapp.mycompany.com");
        System.out.println("== WGET " + url);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        }
    }
}
```

File: `java-logging.properties`

```
handlers= java.util.logging.ConsoleHandler
java.util.logging.ConsoleHandler.level = FINEST
sun.net.www.protocol.http.HttpURLConnection.level = ALL
```

