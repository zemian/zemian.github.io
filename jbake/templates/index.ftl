<#include "header.ftl">
	
	<#include "menu.ftl">

	<#list posts as post>
	  	<#if (post.status == "published"  && post?index >= (currentPageNumber-1) * config.index_posts_per_page?eval && post?index < currentPageNumber * config.index_posts_per_page?eval)>
  			<a href="${post.uri}"><h1><#escape x as x?xml>${post.title}</#escape></h1></a>
  			<p>${post.date?string("dd MMMM yyyy")}<#if (post.tags)??>, tags: <#list post.tags as tag_name>
			    <a href="${content.rootpath}tags/${tag_name}.html">${tag_name}</a> 
				</#list>
			</#if>
  			</p>
  			<p>${post.body}</p>
  		</#if>
  	</#list>

	<hr />

	<ul class="pager">
		<#if (currentPageNumber > 1)><li class="previous"><a href="${config.site_host}/${(currentPageNumber==2)?then('', currentPageNumber-1)}">Previous</a></li></#if>
		<li>Page: ${currentPageNumber}/${numberOfPages}</li>
		<#if (currentPageNumber < numberOfPages)><li class="next"><a href="${config.site_host}/${currentPageNumber + 1}">Next</a></li></#if>
	</ul>

<#include "footer.ftl">