from django.contrib import admin
from django.contrib.admin import ModelAdmin
import ast
from django.contrib.admin import widgets
from picklefield import PickledObjectField
from picklefield.fields import dbsafe_encode

from recipe.models import Category, Recipe


# Register your models here.
class CategoryAdmin(ModelAdmin):
    list_display = ['name', 'recipes_count']


class PickledFieldWidget(widgets.AdminTextareaWidget):
    def value_from_datadict(self, data, files, name):
        value = data.get(name)
        return dbsafe_encode(ast.literal_eval(value), False, 2, True)


class RecipeAdmin(ModelAdmin):
    formfield_overrides = {PickledObjectField: {'widget': PickledFieldWidget}}
    list_display = ['title', 'category', 'image', 'ingredients']


admin.site.register(Category, CategoryAdmin)
admin.site.register(Recipe, RecipeAdmin)
