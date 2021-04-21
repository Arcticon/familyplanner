#!/bin/bash

ansible-playbook -i ansible/inventory/inventory.yml ansible/playbook.yml -t backend -t frontend -l arcticon -K