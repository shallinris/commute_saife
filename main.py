import webapp2
import os 
import urllib

import jinja2

env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class MainHandler(webapp2.RequestHandler):
    def get(self):
    	template = env.get_template('index.html')
    	params = {"gilad":"hello"}
        self.response.write(template.render(params))


app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
