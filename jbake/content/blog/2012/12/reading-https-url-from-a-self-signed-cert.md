title=Reading https url from a self-signed cert
date=2012-12-26
type=post
tags=groovy
status=published
~~~~~~
Groovy has made fetching data from URL a snap:

    println(new URL("http://www.google.com").text)
    

But have you ever try to get data from an `https` of an site that's using a self signed certificate? A browser will prompt you a risk warning, but it let you trust it and still continue. But it's much more hassle if we want to fetch the data programmatically. For example, try fetching [https://www.pcwebshop.co.uk](https://www.pcwebshop.co.uk/) and you will see that it failed miserably:

    Caught: javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
    javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
        at com.sun.net.ssl.internal.ssl.Alerts.getSSLException(Alerts.java:174)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.fatal(SSLSocketImpl.java:1762)
        at com.sun.net.ssl.internal.ssl.Handshaker.fatalSE(Handshaker.java:241)
        at com.sun.net.ssl.internal.ssl.Handshaker.fatalSE(Handshaker.java:235)
        at com.sun.net.ssl.internal.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1206)
        at com.sun.net.ssl.internal.ssl.ClientHandshaker.processMessage(ClientHandshaker.java:136)
        at com.sun.net.ssl.internal.ssl.Handshaker.processLoop(Handshaker.java:593)
        at com.sun.net.ssl.internal.ssl.Handshaker.process_record(Handshaker.java:529)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.readRecord(SSLSocketImpl.java:958)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.performInitialHandshake(SSLSocketImpl.java:1203)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1230)
        at com.sun.net.ssl.internal.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1214)
        at test.run(test.groovy:2)
    Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
        at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.validate(X509TrustManagerImpl.java:126)
        at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:209)
        at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:249)
        at com.sun.net.ssl.internal.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1185)
        ... 8 more
    Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
        ... 12 more
    

This is due to Java API won't let you get data if your certs is not in the keystore or "trusted". Now if you have your own testing site and did a self-signed like above, then sure you just want to trust it temporary and simply want to fetch the data. However configuring the Java API to do such simple task is a nightmare.

Today, I found a library that allow you to perform exactly this: [https://github.com/kevinsawicki/http-request](https://github.com/kevinsawicki/http-request) Trying this out using Groovy is pretty sweet:

    @Grab('com.github.kevinsawicki:http-request:3.1')
    import com.github.kevinsawicki.http.*
    def req = HttpRequest.get("https://www.pcwebshop.co.uk")
    req.trustAllCerts()
    req.trustAllHosts()
    println(req.body())
    

And Voila! We read the URL context without the pesky exception. This `http-request` is awesome! Now I wish JDK let you do simple thing like this. This is extremely useful for testing.