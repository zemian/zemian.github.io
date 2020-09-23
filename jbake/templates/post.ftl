<#include "header.ftl">
	
	<#include "menu.ftl">
	
	<div class="page-header">
		<h1><#escape x as x?xml>${content.title}</#escape></h1>
	</div>

	<p><em>${content.date?string("dd MMMM yyyy")}</em><#if (content.tags)??>, tags: <#list content.tags as tag_name>
	    <a href="${content.rootpath}tags/${tag_name}.html">${tag_name}</a> 
		</#list>
	</#if>
	</p>

	<p>${content.body}</p>

	<hr />

	<#include "_inc_disqus.ftl">
	
<#include "footer.ftl">